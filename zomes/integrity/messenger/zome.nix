{ inputs, ... }:

{
  perSystem = { inputs', system, ... }: {
    packages.messenger_integrity =
      inputs.holochain-utils.outputs.builders.${system}.rustZome {
        workspacePath = inputs.self.outPath;
        crateCargoToml = ./Cargo.toml;
      };
  };
}

