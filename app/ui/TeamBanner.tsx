"use client";
import "@fontsource/josefin-sans";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Section = styled("section")({
  marginBottom: "100px",
  padding: "20px",
  backgroundColor: "#f7f7f7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Heading = styled(Typography)({
  fontFamily: "Josefin Sans",
  textAlign: "center",
  fontSize: "50px",
  color: "#1f1724",
  margin: "0 0 70px",
});

const ProfileContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  width: "90%",
  maxWidth: "1440px",
  margin: "0 auto",
});

const ProfileBox = styled(Box)({
  position: "relative",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(25px)",
  },
  "&:hover .name": {
    opacity: 1,
    transform: "translateX(-50%)",
    boxShadow: "0 10px 20px rgba(86, 86, 198, 0.3)",
  },
});

const StyledAvatar = styled(Avatar)({
  maxWidth: "100%",
  borderRadius: "50%",
  border: "3px solid #1f1724",
  filter: "drop-shadow(-20px 0 10px rgba(0, 0, 0, 0.1))",
  cursor: "pointer",
  marginLeft: "-20px",
  "&:not(:first-of-type)": {
    marginLeft: "-20px",
  },
});

const Name = styled(Box)({
  position: "absolute",
  backgroundColor: "#1f1724",
  color: "#fff",
  fontFamily: "'Bebas Neue', cursive",
  padding: "15px 30px",
  borderRadius: "100px",
  bottom: "-80px",
  left: "50%",
  whiteSpace: "nowrap",
  transform: "translate(-50%, -50px)",
  letterSpacing: "1px",
  fontSize: "20px",
  opacity: 0,
  transition: "all 0.3s",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "15px",
    height: "15px",
    backgroundColor: "#1f1724",
    top: "0",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
});

const teamMembers = [
  {
    name: "Anna Alehed",
    src: "teamAnna.png",
  },
  {
    name: "Elsa Bonde",
    src: "",
  },
  {
    name: "Michaela Andreasson",
    src: "teamMichaela.png",
  },
  {
    name: "Elin Vahlberg",
    src: "teamElin.png",
  },
];
export default function TeamBanner() {
  return (
    <Section>
      <Box>
        <Heading variant="h2">Winemakers</Heading>
        <ProfileContainer>
          {teamMembers.map((member, index) => (
            <ProfileBox key={index}>
              <StyledAvatar
                src={member.src}
                alt={member.name}
                sx={{ width: 200, height: 200 }}
              />
              <Name className="name">{member.name}</Name>
            </ProfileBox>
          ))}
        </ProfileContainer>
      </Box>
    </Section>
  );
}
