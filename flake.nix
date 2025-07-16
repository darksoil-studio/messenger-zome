{
  description = "Template for Holochain app development";

  inputs = {
    holochain-utils.url = "github:darksoil-studio/holochain-utils/main-0.5";
    nixpkgs.follows = "holochain-utils/nixpkgs";

    profiles-zome.url = "github:darksoil-studio/profiles-zome/main-0.5";
    profiles-zome.inputs.holochain-utils.follows = "holochain-utils";

    private-event-sourcing-zome.url =
      "github:darksoil-studio/private-event-sourcing-zome/main-0.5";
    private-event-sourcing-zome.inputs.holochain-utils.follows =
      "holochain-utils";

    linked-devices-zome.url =
      "github:darksoil-studio/linked-devices-zome/main-0.5";
    linked-devices-zome.inputs.holochain-utils.follows = "holochain-utils";
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
    inputs.holochain-utils.inputs.holonix.inputs.flake-parts.lib.mkFlake {
      inherit inputs;
    } {
      imports = [
        ./zomes/integrity/messenger/zome.nix
        ./zomes/coordinator/messenger/zome.nix
        inputs.holochain-utils.outputs.flakeModules.builders
        # Just for testing purposes
        ./workdir/dna.nix
        ./workdir/happ.nix
      ];

      systems =
        builtins.attrNames inputs.holochain-utils.inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.holochain-utils.devShells.synchronized-pnpm
            inputs'.holochain-utils.devShells.default
          ];

          packages = [
            inputs'.holochain-utils.packages.holochain
            inputs'.holochain-utils.packages.hc-scaffold-zome
            inputs'.holochain-utils.packages.hc-playground
            inputs'.holochain-utils.packages.hc-pilot
          ];
        };
        devShells.npm-ci = inputs'.holochain-utils.devShells.synchronized-pnpm;

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.holochain-utils.packages.scaffold-remote-zome ];
          buildInputs = [ pkgs.makeWrapper ];
          postBuild = ''
            wrapProgram $out/bin/scaffold-remote-zome \
              --add-flags "messenger-zome \
                --integrity-zome-name messenger_integrity \
                --coordinator-zome-name messenger \
                --remote-zome-git-url github:darksoil-studio/messenger-zome \
                --remote-npm-package-name @darksoil-studio/messenger-zome \
                --remote-zome-git-branch main-0.5 \
                --context-element messenger-context \
                --context-element-import @darksoil-studio/messenger-zome/dist/elements/messenger-context.js" 
          '';
        };
      };
    };
}
