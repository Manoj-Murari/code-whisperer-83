import { AgentPersona, Message, ChatConversation, RepositoryContext } from '@/types/chat';

export const agentPersonas: AgentPersona[] = [
  {
    id: 'journeyman',
    name: 'Journeyman',
    icon: '🧙',
    description: 'End-to-end bug fixes with Test-Driven Development',
    gradient: '',
  },
  {
    id: 'feature',
    name: 'Feature Developer',
    icon: '🛠️',
    description: 'Implements new features from specifications',
    gradient: '',
  },
  {
    id: 'tester',
    name: 'Tester',
    icon: '🧪',
    description: 'Generates comprehensive unit tests',
    gradient: '',
  },
  {
    id: 'debugger',
    name: 'Debugger',
    icon: '🐛',
    description: 'Runs tests and diagnoses failures',
    gradient: '',
  },
  {
    id: 'tdd',
    name: 'TDD Specialist',
    icon: '🔧',
    description: 'Strict test-driven development workflow',
    gradient: '',
  },
  {
    id: 'pr',
    name: 'PR Creator',
    icon: '🔀',
    description: 'Git operations and pull request management',
    gradient: '',
  },
];

export const dummyMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Analyze https://github.com/pallets/flask',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    role: 'agent',
    content: `🔍 **Repository Analysis Complete**

### Architectural Overview
Flask is a lightweight WSGI web application framework with a modular architecture.

**Key Stats:**
- 📁 **234 Python files**
- 🔗 **1,523 nodes** in code graph
- 🌟 **89 core components**

### Top Components by Centrality

| Rank | Component | Type | File | Centrality |
|------|-----------|------|------|------------|
| 1 | Flask | Class | app.py | 0.95 |
| 2 | request | Function | globals.py | 0.87 |
| 3 | render_template | Function | templating.py | 0.82 |
| 4 | Blueprint | Class | blueprints.py | 0.78 |
| 5 | session | Object | sessions.py | 0.75 |

### Architecture Insights

**Core Patterns:**
- **Application Factory Pattern**: Modular app creation
- **Blueprint System**: Route organization
- **Context Locals**: Thread-safe request handling

**Dependencies:**
\`\`\`python
Werkzeug  # WSGI utilities
Jinja2    # Template engine
Click     # CLI framework
ItsDangerous  # Secure signing
\`\`\`

**Next Steps:**
- Want me to generate tests for the routing module?
- Need help understanding a specific component?
- Ready to fix an issue?`,
    timestamp: new Date(Date.now() - 280000).toISOString(),
    thinking: [
      'Cloning repository...',
      'Parsing 234 files...',
      'Building code graph...',
      'Ranking components by centrality...',
    ],
  },
  {
    id: '3',
    role: 'user',
    content: 'Write comprehensive tests for the routing module',
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '4',
    role: 'agent',
    content: `🧪 **Test Suite Generated for routing.py**

I've created a comprehensive test suite covering all critical routing functionality:

\`\`\`python
import pytest
from flask import Flask
from flask.routing import Rule

class TestRouteRegistration:
    """Test route registration and URL rule creation."""
    
    def test_basic_route(self):
        app = Flask(__name__)
        
        @app.route('/test')
        def test_route():
            return 'success'
        
        assert '/test' in [rule.rule for rule in app.url_map.iter_rules()]
    
    def test_multiple_routes(self):
        app = Flask(__name__)
        
        @app.route('/home')
        @app.route('/index')
        def home():
            return 'home'
        
        rules = [rule.rule for rule in app.url_map.iter_rules()]
        assert '/home' in rules
        assert '/index' in rules

class TestDynamicRoutes:
    """Test dynamic URL parameters."""
    
    def test_string_parameter(self):
        app = Flask(__name__)
        
        @app.route('/user/<username>')
        def user_profile(username):
            return f'User: {username}'
        
        with app.test_client() as client:
            response = client.get('/user/john')
            assert response.data == b'User: john'
    
    def test_integer_parameter(self):
        app = Flask(__name__)
        
        @app.route('/post/<int:post_id>')
        def show_post(post_id):
            return f'Post: {post_id}'
        
        with app.test_client() as client:
            response = client.get('/post/42')
            assert response.data == b'Post: 42'
    
    def test_path_parameter(self):
        app = Flask(__name__)
        
        @app.route('/files/<path:filepath>')
        def serve_file(filepath):
            return f'File: {filepath}'
        
        with app.test_client() as client:
            response = client.get('/files/docs/guide.pdf')
            assert response.data == b'File: docs/guide.pdf'

class TestHTTPMethods:
    """Test HTTP method handling."""
    
    def test_get_request(self):
        app = Flask(__name__)
        
        @app.route('/api/data', methods=['GET'])
        def get_data():
            return {'status': 'ok'}
        
        with app.test_client() as client:
            response = client.get('/api/data')
            assert response.status_code == 200
    
    def test_post_request(self):
        app = Flask(__name__)
        
        @app.route('/api/data', methods=['POST'])
        def create_data():
            return {'created': True}, 201
        
        with app.test_client() as client:
            response = client.post('/api/data')
            assert response.status_code == 201
\`\`\`

**Test Coverage:**
- ✅ Route registration (basic and multiple)
- ✅ Dynamic URL parameters (string, int, path)
- ✅ HTTP methods (GET, POST, PUT, DELETE)
- ✅ URL building and reversal
- ✅ Error handling (404, 405)

**Test Results:**
\`\`\`bash
======================== test session starts ========================
collected 8 items

test_routing.py ........                                     [100%]

======================== 8 passed in 0.24s ========================
\`\`\`

**Would you like me to:**
- Run these tests against the actual Flask codebase?
- Add integration tests?
- Generate tests for another module?`,
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
];

export const dummyConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    title: 'Flask Repository Analysis',
    personaId: 'journeyman',
    messages: dummyMessages,
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'conv-2',
    title: 'React Component Testing',
    personaId: 'tester',
    messages: [
      {
        id: 'c2-1',
        role: 'user',
        content: 'Generate tests for the UserProfile component',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'c2-2',
        role: 'agent',
        content: '🧪 **Test Suite Created**\n\nGenerated comprehensive tests for UserProfile including snapshot, prop validation, and user interaction tests.',
        timestamp: new Date(Date.now() - 86300000).toISOString(),
      },
    ],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'conv-3',
    title: 'Authentication Bug Fix',
    personaId: 'debugger',
    messages: [
      {
        id: 'c3-1',
        role: 'user',
        content: 'Debug the OAuth callback failing with 401',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
    ],
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const currentContext: RepositoryContext = {
  repository: 'pallets/flask',
  language: 'Python',
  fileCount: 234,
  filesInContext: [
    'src/flask/app.py',
    'src/flask/routing.py',
    'src/flask/globals.py',
    'src/flask/blueprints.py',
  ],
  currentTask: 'Writing comprehensive tests for routing module',
};
