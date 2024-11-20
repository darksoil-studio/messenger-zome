{ inputs, ... }:

{
  perSystem = { inputs', self', lib, system, ... }: {
    packages.messenger_test_dna =
      inputs.tnesh-stack.outputs.builders.${system}.dna {
        dnaManifest = ./dna.yaml;
        zomes = {
          file_storage_integrity = inputs'.file-storage.packages.file_storage_integrity;
          file_storage = inputs'.file-storage.packages.file_storage;
          notifications_integrity =
            inputs'.notifications-zome.packages.notifications_integrity;
          notifications = inputs'.notifications-zome.packages.notifications;
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
        };
      };
  };
}

