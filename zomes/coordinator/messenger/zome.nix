{ inputs, ... }:

{
  perSystem = { inputs', system, self', ... }: rec {
    builders.messenger =
      { linked_devices_coordinator_zome_name, async_message_zome_name }:
      inputs.holochain-utils.outputs.builders.${system}.rustZome {
        workspacePath = inputs.self.outPath;
        crateCargoToml = ./Cargo.toml;
        zomeEnvironmentVars = {
          LINKED_DEVICES_COORDINATOR_ZOME_NAME =
            linked_devices_coordinator_zome_name;
          ASYNC_MESSAGE_ZOME = async_message_zome_name;
        };
      };

    packages.messenger = builders.messenger {
      linked_devices_coordinator_zome_name = "linked_devices";
      async_message_zome_name = "encrypted_links";
    };

  };
}

