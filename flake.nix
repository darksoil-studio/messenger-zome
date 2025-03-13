{
  description = "Template for Holochain app development";

  inputs = {
    file-storage.url = "github:darksoil-studio/file-storage/main-0.4";
    holonix.url = "github:holochain/holonix/main-0.4";

    nixpkgs.follows = "holonix/nixpkgs";
    flake-parts.follows = "holonix/flake-parts";

    tnesh-stack.url = "github:darksoil-studio/tnesh-stack/main-0.4";
    playground.url = "github:darksoil-studio/holochain-playground/main-0.4";
    p2p-shipyard.url = "github:darksoil-studio/p2p-shipyard/main-0.4";

    profiles-zome.url = "github:darksoil-studio/profiles-zome/main-0.4";
    notifications-zome.url =
      "github:darksoil-studio/notifications-zome/main-0.4";
    linked-devices-zome.url =
      "github:darksoil-studio/linked-devices-zome/main-0.4";
    private-event-sourcing-zome.url =
      "github:darksoil-studio/private-event-sourcing-zome/main-0.4";
  };

  nixConfig = {
    extra-substituters = [
      "https://holochain-ci.cachix.org"
      "https://darksoil-studio.cachix.org"
    ];
    extra-trusted-public-keys = [
      "holochain-ci.cachix.org-1:5IUSkZc0aoRS53rfkvH9Kid40NpyjwCMCzwRTXy+QN8="
      "darksoil-studio.cachix.org-1:UEi+aujy44s41XL/pscLw37KEVpTEIn8N/kn7jO8rkc="
    ];
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        ./zomes/integrity/messenger/zome.nix
        ./zomes/coordinator/messenger/zome.nix
        inputs.tnesh-stack.outputs.flakeModules.builders
        # Just for testing purposes
        ./workdir/dna.nix
        ./workdir/happ.nix
      ];

      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.tnesh-stack.devShells.synchronized-pnpm
            inputs'.holonix.devShells.default
          ];

          packages = [
            inputs'.tnesh-stack.packages.holochain
            inputs'.tnesh-stack.packages.hc-scaffold-zome
            inputs'.playground.packages.hc-playground
            inputs'.p2p-shipyard.packages.hc-pilot
          ];
        };
        devShells.npm-ci = inputs'.tnesh-stack.devShells.synchronized-pnpm;

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.tnesh-stack.packages.scaffold-remote-zome ];
          buildInputs = [ pkgs.makeWrapper ];
          postBuild = ''
            wrapProgram $out/bin/scaffold-remote-zome \
              --add-flags "messenger-zome \
                --integrity-zome-name messenger_integrity \
                --coordinator-zome-name messenger \
                --remote-zome-git-url github:darksoil-studio/messenger-zome \
                --remote-npm-package-name @darksoil-studio/messenger-zome \
                --remote-zome-git-branch main-0.4 \
                --context-element messenger-context \
                --context-element-import @darksoil-studio/messenger-zome/dist/elements/messenger-context.js" 
          '';
        };
      };
    };
}
