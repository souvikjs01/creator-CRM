import {
  Html,
  Body,
  Container,
  Heading,
  Text
} from "@react-email/components";

type Props = {
  name: string;
};

export default function NewCreatorEmail({ name }: Props) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "Arial" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          <Heading>Welcome to our Grangou Creators🎉</Heading>

          <Text>
            Hi {name}, your creator profile has been successfully added our creator list.
          </Text>

          <Text>
            You can now collaborate with brands and manage your campaigns.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}