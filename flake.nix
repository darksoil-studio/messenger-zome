{
  description = "Template for Holochain app development";

  inputs = {
    holonix.url = "github:holochain/holonix/main-0.5";

    nixpkgs.follows = "holonix/nixpkgs";
    flake-parts.follows = "holonix/flake-parts";

    scaffolding.url = "github:darksoil-studio/scaffolding/main-0.5";
    holochain-nix-builders.url =
      "github:darksoil-studio/holochain-nix-builders/main-0.5";
    playground.url = "github:darksoil-studio/holochain-playground/main-0.5";
    tauri-plugin-holochain.url =
      "github:darksoil-studio/tauri-plugin-holochain/main-0.5";

    profiles-zome.url = "github:darksoil-studio/profiles-zome/main-0.5";
    linked-devices-zome.url =
      "github:darksoil-studio/linked-devices-zome/main-0.5";
    private-event-sourcing-zome.url =
      "github:darksoil-studio/private-event-sourcing-zome/main-0.5";
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
        inputs.holochain-nix-builders.outputs.flakeModules.builders
        # Just for testing purposes
        ./workdir/dna.nix
        ./workdir/happ.nix
      ];

      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', config, pkgs, system, ... }: {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            inputs'.scaffolding.devShells.synchronized-pnpm
            inputs'.holonix.devShells.default
          ];

          packages = [
            inputs'.holochain-nix-builders.packages.holochain
            inputs'.scaffolding.packages.hc-scaffold-zome
            inputs'.playground.packages.hc-playground
            inputs'.tauri-plugin-holochain.packages.hc-pilot
          ];
        };
        devShells.npm-ci = inputs'.scaffolding.devShells.synchronized-pnpm;

        packages.scaffold = pkgs.symlinkJoin {
          name = "scaffold-remote-zome";
          paths = [ inputs'.scaffolding.packages.scaffold-remote-zome ];
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
