{ inputs, ... }:

{
  perSystem = { inputs', system, self', ... }: rec {
    builders.messenger = { linked_devices_coordinator_zome_name }:
      inputs.tnesh-stack.outputs.builders.${system}.rustZome {
        workspacePath = inputs.self.outPath;
        crateCargoToml = ./Cargo.toml;
        cargoArtifacts = inputs'.tnesh-stack.packages.zomeCargoArtifacts;
        zomeEnvironmentVars = {
          LINKED_DEVICES_COORDINATOR_ZOME_NAME =
            linked_devices_coordinator_zome_name;
        };
      };

    packages.messenger = builders.messenger {
      linked_devices_coordinator_zome_name = "linked_devices";
    };

  };
}

