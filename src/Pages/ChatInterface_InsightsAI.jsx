import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  Divider,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  LinearProgress,
  Badge,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Fade,
  Zoom
} from '@mui/material';
import {
  Send,
  Search,
  AttachFile,
  SmartToy,
  Person,
  FiberManualRecord,
  Close,
  CloudUpload,
  Description,
  Check,
  DoneAll,
  Schedule
} from '@mui/icons-material';

// Mock AI Response Generator
const generateAIResponse = (message, uploadedFiles = []) => {
  const responses = [
    "I understand your request. Let me help you with that.",
    "That's an interesting question! Based on my analysis, I can provide you with several insights.",
    "I've processed your message and here's what I found:",
    "Great question! I can definitely assist you with this.",
    "Let me break this down for you step by step.",
    "I've analyzed the information and here are my recommendations:",
    "Based on current data trends, I suggest the following approach:",
    "I can help you optimize this process. Here are some suggestions:",
  ];

  const fileResponses = [
    "I've successfully processed your file. Here's what I found:",
    "Thank you for uploading the file. I can see it contains valuable data.",
    "File processed successfully! I can help you analyze this information.",
    "I've reviewed your uploaded file and have some insights to share:",
  ];

  if (uploadedFiles.length > 0) {
    const fileNames = uploadedFiles.map(f => f.name).join(', ');
    return `${fileResponses[Math.floor(Math.random() * fileResponses.length)]}\n\n📁 Files processed: ${fileNames}\n\nThe data looks comprehensive and I can help you with analysis, insights, or any specific questions you have about this information. Would you like me to:\n\n• 📊 Generate a summary report\n• 🔍 Extract key insights\n• 📈 Create data visualizations\n• ❓ Answer specific questions about the data\n\nWhat would be most helpful for you?`;
  }

  const baseResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Add contextual responses based on keywords
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('report') || lowerMessage.includes('analysis')) {
    return `${baseResponse}\n\nI can generate comprehensive reports and perform detailed analysis. Here are the available options:\n\n📊 Business Intelligence Reports\n📈 Performance Analytics\n📋 Data Summary Reports\n🎯 KPI Dashboards\n\nWhich type of analysis would you prefer?`;
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return `${baseResponse}\n\nI'm here to assist you with:\n\n🤖 AI-Powered Analysis\n📊 Data Processing & Insights\n📈 Business Intelligence\n💡 Strategic Recommendations\n🔧 Process Optimization\n\nWhat specific area would you like help with?`;
  }

  return `${baseResponse}\n\nI can assist you with various tasks including data analysis, report generation, process optimization, and strategic insights. Feel free to ask me anything or upload files for analysis.\n\nIs there a specific aspect you'd like me to focus on?`;
};

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with data analysis, reports, insights, and much more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 60000),
      status: 'delivered'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileDialog, setFileDialog] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Send message function
  const sendMessage = useCallback(async () => {
    if (!inputText.trim() && uploadedFiles.length === 0) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setUploadedFiles([]);

    // Update message status to sent
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);

    // Update message status to delivered
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI processing time (2-4 seconds)
    const processingTime = Math.random() * 2000 + 2000;
    
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputText, uploadedFiles.length > 0 ? uploadedFiles : []),
        sender: 'ai',
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev, aiResponse]);
    }, processingTime);
  }, [inputText, uploadedFiles]);

  // Handle file upload
  const handleFileUpload = useCallback((files) => {
    setIsUploading(true);
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));

    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      setFileDialog(false);
    }, 1000);
  }, []);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  // Filter messages based on search and filter type
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || message.sender === filterType;
    return matchesSearch && matchesFilter;
  });

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending': return <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />;
      case 'sent': return <Check sx={{ fontSize: 16, color: 'text.secondary' }} />;
      case 'delivered': return <DoneAll sx={{ fontSize: 16, color: 'primary.main' }} />;
      default: return null;
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <Box key={index} component="span" sx={{ backgroundColor: 'yellow', px: 0.5, borderRadius: 0.5 }}>
          {part}
        </Box>
      ) : (
        part
      )
    );
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <SmartToy />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
              inFlow AssistAI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered business assistant
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#44b700',
                  color: '#44b700',
                  '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""',
                  },
                },
                '@keyframes ripple': {
                  '0%': { transform: 'scale(.8)', opacity: 1 },
                  '100%': { transform: 'scale(2.4)', opacity: 0 },
                },
              }}
            >
              <FiberManualRecord />
            </Badge>
            <Typography variant="body2" sx={{ ml: 1 }}>
              Online
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search and Filter Bar */}
      <Paper elevation={0} sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter Messages</InputLabel>
              <Select
                value={filterType}
                label="Filter Messages"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Messages</MenuItem>
                <MenuItem value="user">My Messages</MenuItem>
                <MenuItem value="ai">AI Messages</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {searchQuery && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Found {filteredMessages.length} message(s) matching "{searchQuery}"
          </Typography>
        )}
      </Paper>

      {/* Chat Messages */}
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: dragActive ? 'action.hover' : 'inherit',
          border: dragActive ? 2 : 0,
          borderColor: 'primary.main',
          borderStyle: 'dashed',
          position: 'relative'
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragActive && (
          <Fade in={dragActive}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'background.paper'
                }}
              >
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" color="primary.main">
                  Drop files here to upload
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}

        <Container maxWidth="md">
          {filteredMessages.map((message) => (
            <Box key={message.id} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 1
                }}
              >
                {message.sender === 'ai' && (
                  <Avatar sx={{ bgcolor: 'grey.300' }}>
                    <SmartToy />
                  </Avatar>
                )}

                <Box sx={{ maxWidth: '70%' }}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      borderBottomRightRadius: message.sender === 'user' ? 0 : 2,
                      borderBottomLeftRadius: message.sender === 'ai' ? 0 : 2,
                    }}
                  >
                    {/* File Attachments */}
                    {message.files && message.files.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        {message.files.map((file) => (
                          <Card key={file.id} variant="outlined" sx={{ mb: 1, bgcolor: message.sender === 'user' ? 'primary.dark' : 'grey.100' }}>
                            <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Description sx={{ color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary' }} />
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 'medium',
                                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {file.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary',
                                      opacity: 0.8
                                    }}
                                  >
                                    {formatFileSize(file.size)}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    )}

                    {/* Message Text */}
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {searchQuery ? highlightText(message.text, searchQuery) : message.text}
                    </Typography>
                  </Paper>

                  {/* Message Info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    {message.sender === 'user' && getStatusIcon(message.status)}
                  </Box>
                </Box>

                {message.sender === 'user' && (
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                )}
              </Box>
            </Box>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <Zoom in={isTyping}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mb: 3 }}>
                <Avatar sx={{ bgcolor: 'grey.300' }}>
                  <SmartToy />
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    borderBottomLeftRadius: 0
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'grey.400',
                          borderRadius: '50%',
                          animation: 'bounce 1.4s infinite',
                          animationDelay: `${i * 0.16}s`,
                          '@keyframes bounce': {
                            '0%, 80%, 100%': { transform: 'scale(0)' },
                            '40%': { transform: 'scale(1)' }
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Zoom>
          )}

          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* File Upload Preview */}
      {uploadedFiles.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Files to upload:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {uploadedFiles.map((file) => (
              <Chip
                key={file.id}
                icon={<Description />}
                label={`${file.name} (${formatFileSize(file.size)})`}
                onDelete={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Message Input */}
      <Paper elevation={0} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          {/* File Upload Button */}
          <Tooltip title="Upload files">
            <IconButton
              color="primary"
              onClick={() => setFileDialog(true)}
              disabled={isUploading}
              sx={{ mb: 0.5 }}
            >
              {isUploading ? <CircularProgress size={24} /> : <AttachFile />}
            </IconButton>
          </Tooltip>

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3
              }
            }}
          />

          {/* Send Button */}
          <Tooltip title="Send message">
            <span>
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={!inputText.trim() && uploadedFiles.length === 0}
                sx={{
                  minWidth: 48,
                  height: 48,
                  borderRadius: 3,
                  mb: 0.5
                }}
              >
                <Send />
              </Button>
            </span>
          </Tooltip>
        </Box>

        {/* Input Help Text */}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
          Press Enter to send • Shift+Enter for new line • Drag & drop files to upload
        </Typography>
      </Paper>

      {/* File Upload Dialog */}
      <Dialog open={fileDialog} onClose={() => setFileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
          <Paper
            onClick={() => fileInputRef.current?.click()}
            sx={{
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              border: 2,
              borderColor: 'divider',
              borderStyle: 'dashed',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover'
              }
            }}
          >
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Click to upload files
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select multiple files to upload
            </Typography>
          </Paper>
          {isUploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                Uploading files...
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AIChat;