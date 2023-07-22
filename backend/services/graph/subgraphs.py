import glob
import json
import os
import yaml
import sys
class SubgraphService:
    def __init__(self, protocol, chain):
        self.protocol = protocol
        self.chain = chain
        # sys.path.append('../')
        self.deployments = json.load(
                open(os.getcwdb().decode("utf-8") + "/subgraphs/deployment/deployment.json")
            )[protocol]
        
        try:
            # see if deployed on given chain
            assert f"{protocol}-{chain}" in self.deployments["deployments"]
        except AssertionError:
            # protocol is not deployed on given chain
            raise NotImplementedError(f"no subgraph deployed for {protocol} on {chain}")
        if (
            "decentralized-network"
            in self.deployments["deployments"][f"{protocol}-{chain}"]["services"]
        ):
            self.service_type = "decentralized-network"
            # # uniswap-v3 decentralised api keeps timing out??
            # if protocol == "uniswap-v3":
            #     self.service_type = "hosted-service"
            
        elif (
            "hosted-service"
            in self.deployments["deployments"][f"{protocol}-{chain}"]["services"]
        ):
            self.service_type = "hosted-service"
        try:
            self.query_id = self.deployments["deployments"][f"{protocol}-{chain}"][
                "services"
            ][self.service_type]["query-id"]
        except AttributeError:
            # protocol does not have any deployments
            self.query_id = None
            raise NotImplementedError(f"no subgraphs deployed for {protocol} at all")
        try:
            self.template_file_location = f"subgraphs/subgraphs/{self.deployments['base']}/protocols/{self.protocol}/config/templates/{self.deployments['deployments'][f'{protocol}-{chain}']['files']['template']}"
        except:
            self.template_file_location = None
            pass

        if os.path.isfile(
            f"subgraphs/subgraphs/{self.deployments['base']}/schema.graphql"
        ):
            self.schema_file_location = (
                f"subgraphs/subgraphs/{self.deployments['base']}/schema.graphql"
            )
        else:
            self.schema_file_location = None
        self.mappers = self.read_mappings_dir(
            f"subgraphs/subgraphs/{self.deployments['base']}/src"
        )

    def read_mappings_dir(self, directory):
        return list(glob.iglob(f"{directory}/**/*.ts", recursive=True))

    def parse_template_file(self):
        # TODO: yaml.constructor.ConstructorError: while constructing a mapping
        with open(self.template_file_location, "r") as stream:
            yaml_content = yaml.safe_load(stream)
        print(yaml_content)

    


