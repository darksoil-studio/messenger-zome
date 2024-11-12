{ inputs, ... }:

{
  perSystem =
    { inputs'
    , self'
    , lib
    , system
    , ...
    }: {
      packages.messenger_test_dna = inputs.tnesh-stack.outputs.builders.${system}.dna {
        dnaManifest = ./dna.yaml;
        zomes = {
          # Include here the zome packages for this DNA, e.g.:
          profiles_integrity = inputs'.profiles-zome.packages.profiles_integrity;
          profiles = inputs'.profiles-zome.packages.profiles;
          # This overrides all the "bundled" properties for the DNA manifest
          messenger_integrity = self'.packages.messenger_integrity;
          messenger = self'.packages.messenger;
        };
      };
    };
}

