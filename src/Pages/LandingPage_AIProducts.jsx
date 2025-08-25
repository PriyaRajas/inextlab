import React, { useState, createContext, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Divider,
  Paper,
  CardActions,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slide,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Analytics,
  Assistant,
  Insights,
  DataUsage,
  ArrowForward,
  Star,
  CheckCircle,
  TrendingUp,
  Speed,
  Security,
  CloudUpload,
  DarkMode,
  LightMode,
  Chat,
  Send,
  SupervisedUserCircleOutlined,
  SelfImprovement,
  TurnSlightRightTwoTone,
  InsertInvitationSharp,
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import AIImage from "../../public/AI_Image.png";

const LandingPageAIProducts = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const navigate = useNavigate();

  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#4fc3f7",
      },
      secondary: {
        main: "#29b6f6",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const products = [
    {
      id: "docsai",
      name: "inFlow DocsAI",
      tagline: "Gen AI-powered omnichannel assistants",
      description:
        "Stop drowning in paperwork. inFlow DocsAI instantly transforms invoices, contracts, and policies into competitive advantage while competitors waste hours manually processing",
      icon: <Assistant sx={{ fontSize: 40 }} />,
      color: "#1976d2",
      features: [
        "Comprehensive Data Governance",
        "Contextual AI with Advanced RAG",
        "Multi-Source Integrations",
        "Intelligent Document Automation",
      ],
      benefits:
        "Our advanced AI doesn't just read documents—it understands context, validates data, and flags inconsistencies before they become costly mistakes.",
      image: "/api/placeholder/400/250",
    },
    {
      id: "insightsai",
      name: "inFlow InsightsAI",
      tagline: "Comprehensive analysis for all your data types",
      description:"InFlow InsightsAI transforms scattered data into clear predictions and actionable insights that drive real growth. While traditional tools show what happened, InFlow forecasts what's next and tells you exactly how to act.",
      icon: <Insights sx={{ fontSize: 40 }} />,
      color: "#388e3c",
      features: [
        "For Sales & Marketing Teams",
        "For Operations Managers",
        "For Data Teams",
        "For Executive Leaders",
      ],
      benefits: "Predict outcomes with 94% accuracy using machine learning that analyzes trends, patterns, and anomalies in your data.",
      image: "/api/placeholder/400/250",
    },
    {
      id: "engageai",
      name: "inFlow EngageAI",
      tagline: "The AI Revolution That's Making Chatbots Obsolete",
      description:"Meet the next generation of AI agents that don't just respond, but sell, solve, and scale your success 24/7. Turn every conversation into results with purpose-built agents that convert, resolve, and transform your business.",
      icon: <Analytics sx={{ fontSize: 40 }} />,
      color: "#f57c00",
      features: [
        "HR Support Champion",
        "Real-time Updates",
        "Custom Templates",
        "Banking, Financial Services & Insurance (BFSI)",
      ],
      benefits:
       "One AI, every channel—web, mobile, voice, WhatsApp, IVR email, SMS, and more. Consistent experiences, everywhere.",
      image: "/api/placeholder/400/250",
    },
    {
      id: "assistai",
      name: "inFlow AssistAI",
      tagline: "Elevate customer interactions with AI",
      description:
        "Empower your support team with AI-driven tools that enhance customer service quality and operational efficiency.",
      icon: <DataUsage sx={{ fontSize: 40 }} />,
      color: "#7b1fa2",
      features: [
        "Smart Routing",
        "Sentiment Analysis",
        "Auto-suggestions",
        "Performance Metrics",
      ],
      benefits:
        "Boost team productivity by 60% while reducing operational costs",
      image: "/api/placeholder/400/250",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const NavItems = () => (
    <List>
      <ListItem button onClick={() => navigateTo("home")}>
        <ListItemText primary="Home" />
      </ListItem>
      {products.map((product) => (
        <ListItem
          button
          key={product.id}
          onClick={() => navigateTo(product.id)}
        >
          <ListItemText primary={product.name} />
        </ListItem>
      ))}
    </List>
  );

  const Header = () => (
    <AppBar
      position="sticky"
      sx={{ bgcolor: darkMode ? "#1a1a2e" : "#FFFFFF", mb: 0 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          <Box component="span" sx={{ color: "#4fc3f7" }}>
            iNext
          </Box>
          <Box component="span"  sx={{ bgcolor: darkMode ? "#1a1a2e" : "#FFFFFF"}}>
            Labs
          </Box>
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigateTo("home")}>
              Home
            </Button>
            {products.map((product) => (
              <Button
                key={product.id}
                color="inherit"
                onClick={() => navigateTo(product.id)}
              >
                {product.name.split(" ")[1]}
              </Button>
            ))}
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );

  const HomePage = () => (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: darkMode
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background: "linear-gradient(45deg, #4fc3f7, #29b6f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Building Agentic AI for Enterprise Excellence
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
              >
                Empower your business with state-of-the-art Generative AI
                solutions designed to enhance efficiency, accuracy, and growth.
                From telco to FSI, healthcare to government, we have delivered
                transformative AI solutions that drive real-world impact and
                value across industries.{" "}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 250, md: 400 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #4fc3f7, #29b6f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "pulse 2s ease-in-out infinite alternate",
                  }}
                >
                  <Box
                    component="img"
                    src={AIImage}
                    alt="Analytics"                  
                    sx={{
                      width: { xs: 180, md: 200 },
                      height: { xs: 180, md: 200 },
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 2, fontWeight: "bold", color: theme.palette.text.primary }}
        >
          Our AI Product Suite
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 6, color: "text.secondary", maxWidth: 800, mx: "auto" }}
        >
          Discover our comprehensive range of AI-powered solutions designed to
          transform your business operations
        </Typography>

        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item size={{ xs: 12, md: 6, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[12],
                    "& .product-icon": {
                      transform: "scale(1.1)",
                      color: product.color,
                    },
                  },
                }}
                onClick={() => navigateTo(product.id)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Box
                    className="product-icon"
                    sx={{
                      mb: 2,
                      transition: "all 0.3s ease",
                      color: "text.secondary",
                    }}
                  >
                    {product.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.tagline}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {product.description.substring(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    endIcon={<ArrowForward />}
                    sx={{ color: product.color, fontWeight: "bold" }}
                    fullWidth
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f8f9fa",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            Why Choose InextLabs?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <SupervisedUserCircleOutlined />,
                title: "Customer Obsessed",
                desc: "Customer satisfaction is our #1 priority.",
              },
              {
                icon: <SelfImprovement />,
                title: "Problem Solving",
                desc: "We are passionate about adding value and problem solving for our customers.",
              },
              {
                icon: <TurnSlightRightTwoTone />,
                title: "Integrity and Trust",
                desc: "Integrity and Trust are at the core of what we do.",
              },
              {
                icon: <InsertInvitationSharp />,
                title: "Innovation",
                desc: "We embrace innovation to drive growth and efficiency.",
              },
            ].map((feature, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#4fc3f7",
                      width: 60,
                      height: 60,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );

  const ProductPage = ({ product }) => (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        onClick={() => navigateTo("home")}
        sx={{ mb: 4, color: product.color }}
        startIcon={<ArrowForward sx={{ transform: "rotate(180deg)" }} />}
      >
        Back to Home
      </Button>

      <Grid container spacing={6}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Chip
            label="AI Product"
            sx={{
              bgcolor: product.color,
              color: "white",
              mb: 2,
              fontWeight: "bold",
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: theme.palette.text.primary,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: product.color,
              fontWeight: 500,
            }}
          >
            {product.tagline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "text.secondary",
            }}
          >
            {product.description}
          </Typography>

          <Paper
            sx={{
              p: 3,
              mb: 4,
              bgcolor: theme.palette.mode === "dark" ? "#2e2e2e" : "#f8f9fa",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Key Benefits
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircle sx={{ color: product.color }} />
              <Typography>{product.benefits}</Typography>
            </Box>
          </Paper>

        
        </Grid>

        <Grid item xs={12} md={6}>

          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Key Features & why iNextLabs?
          </Typography>
          <Grid container spacing={4} rowSpacing={6}>
            {product.features.map((feature, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper sx={{ p: 2, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Star sx={{ color: product.color, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}
      >
        <Header />

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <Box component="span" sx={{ color: "#4fc3f7" }}>
                inext
              </Box>
              <Box component="span" sx={{ color: theme.palette.text.primary }}>
                Labs
              </Box>
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <NavItems />
        </Drawer>

        <Box component="main">
          {currentPage === "home" && <HomePage />}
          {products.map(
            (product) =>
              currentPage === product.id && (
                <ProductPage key={product.id} product={product} />
              )
          )}
        </Box>

        <Fab
          color="primary"
          aria-label="chat"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={() => navigate("/assistAI")}
        >
          <Chat />
        </Fab>

        <Box
          component="footer"
          sx={{
            bgcolor: "#1a1a2e",
            color: "white",
            py: 6,
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              <Box component="span" sx={{ color: "#4fc3f7" }}>
                inext
              </Box>
              <Box component="span">Labs</Box>
            </Typography>
            <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
              Building Agentic AI for Enterprise Excellence
            </Typography>
          </Container>
        </Box>

     
      </Box>
    </ThemeProvider>
  );
};

export default LandingPageAIProducts;
