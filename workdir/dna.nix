{ inputs, ... }:

{
  perSystem = { inputs', self', lib, system, ... }: {
    packages.messenger_test_dna =
      inputs.holochain-utils.outputs.builders.${system}.dna {
        dnaManifest = ./dna.yaml;
        zomes = {
          linked_devices_integrity =
            inputs'.linked-devices-zome.packages.linked_devices_integrity;
          linked_devices = inputs'.linked-devices-zome.packages.linked_devices;
          # Include here the zome packages for this DNA, e.g.:
          profiles_integrity =
            inputs'.profiles-zome.packages.profiles_integrity;
          profiles = inputs'.profiles-zome.packages.profiles;
          # This overrides all the "bundled" properties for the DNA manifest
          messenger_integrity = self'.packages.messenger_integrity;
          messenger = self'.packages.messenger;

          encrypted_links_integrity =
            inputs'.private-event-sourcing-zome.packages.encrypted_links_integrity;
          encrypted_links =
            inputs'.private-event-sourcing-zome.packages.encrypted_links;
        };
      };
  };
}

