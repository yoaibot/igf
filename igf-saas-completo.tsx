import React, { useState, useEffect } from 'react';
import { Calendar, Users, BookOpen, Bell, BarChart3, Settings, LogOut, User, Clock, AlertCircle, CheckCircle, X, Plus, Search, Filter, ChevronDown, ChevronRight, Home, MessageSquare, CalendarDays, TrendingUp, Award, Monitor, UserCheck, Gift, Edit, Trash2, Save, FileText, Star, DollarSign, CreditCard, AlertTriangle, Target, Activity, Eye, EyeOff, Wrench, Check, CalendarCheck, Trophy } from 'lucide-react';

const IGFSaaS = () => {
  const [userType, setUserType] = useState(''); // 'diretor', 'professor', 'aluno'
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ usuario: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  
  const [students, setStudents] = useState([
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 98765-4321',
      dataNascimento: '2005-03-15',
      responsavel: 'Maria Silva',
      telefoneResponsavel: '(11) 98765-4320',
      endereco: 'Rua das Flores, 123',
      modulos: ['Excel Avançado', 'Word Básico'],
      progresso: 65,
      presencas: 28,
      faltas: 2,
      eventos: ['Workshop Montagem PC', 'Palestra Empreendedorismo'],
      dataInicio: '2024-01-15',
      dataFim: '2024-07-15',
      duracaoCurso: 6, // meses
      totalAulas: 24, // calculado automaticamente
      aulasRestantes: 8,
      satisfacao: 4.5,
      status: 'ativo',
      turma: 'Segunda 7h-9h',
      diasAula: ['Segunda', 'Quarta'],
      mensalidade: 250,
      parcelas: 6,
      parcelasPagas: 3,
      proximoPagamento: '2024-04-15',
      pagamentoCompleto: false,
      formaPagamento: 'pix',
      atividadesExtras: true,
      pontosFidelidade: 95, // pontos para sorteio
      historico: {
        posVenda: 'Aluno muito satisfeito com o atendimento inicial',
        comportamentoSala: 'Participativo e dedicado',
        insatisfacoes: 'Solicitou mais exercícios práticos'
      },
      computadorPreferencial: 'PC-05',
      usuario: 'joao.silva',
      senha: '123456',
      dataMatricula: '2024-01-10'
    },
    {
      id: 2,
      nome: 'Ana Santos',
      telefone: '(11) 97654-3210',
      dataNascimento: '2006-07-22',
      responsavel: 'Pedro Santos',
      telefoneResponsavel: '(11) 97654-3211',
      endereco: 'Av. Principal, 456',
      modulos: ['PowerPoint', 'Internet Segura'],
      progresso: 45,
      presencas: 25,
      faltas: 5,
      eventos: ['Imersão de Vendas'],
      dataInicio: '2024-02-01',
      dataFim: '2024-08-01',
      duracaoCurso: 6,
      totalAulas: 24,
      aulasRestantes: 13,
      satisfacao: 3.8,
      status: 'inativo',
      turma: 'Terça 9h-11h',
      diasAula: ['Terça', 'Quinta'],
      mensalidade: 200,
      parcelas: 12,
      parcelasPagas: 12,
      proximoPagamento: null,
      pagamentoCompleto: true,
      formaPagamento: 'boleto',
      atividadesExtras: false,
      pontosFidelidade: 45,
      historico: {
        posVenda: 'Teve dúvidas sobre o material didático',
        comportamentoSala: 'Tímida mas está evoluindo',
        insatisfacoes: 'Horário das aulas'
      },
      computadorPreferencial: 'PC-12',
      usuario: 'ana.santos',
      senha: '123456',
      dataMatricula: '2024-01-25'
    }
  ]);

  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: 'Workshop Montagem e Manutenção de Computadores',
      data: '2024-03-20',
      horario: '14:00',
      vagas: 20,
      inscritos: 15,
      descricao: 'Aprenda a montar e fazer manutenção em computadores'
    },
    {
      id: 2,
      titulo: 'Palestra: Empreendedorismo Digital',
      data: '2024-03-25',
      horario: '19:00',
      vagas: 50,
      inscritos: 32,
      descricao: 'Como empreender no mundo digital'
    }
  ]);

  // 26 computadores por horário
  const [computadores, setComputadores] = useState(
    Array.from({ length: 26 }, (_, i) => ({
      id: i + 1,
      nome: `PC-${String(i + 1).padStart(2, '0')}`,
      status: i < 20 ? 'disponivel' : i < 24 ? 'ocupado' : 'manutencao',
      horario: i >= 20 && i < 24 ? '7h-9h' : '',
      aluno: i === 20 ? 'João Silva' : i === 21 ? 'Ana Santos' : ''
    }))
  );

  const [presencaDiaria, setPresencaDiaria] = useState({
    data: new Date().toISOString().split('T')[0],
    horario: '9h-11h',
    alunosPresentes: [],
    totalAlunos: 10
  });

  const [reposicoes, setReposicoes] = useState([]);

  const [ouvidoria, setOuvidoria] = useState([
    { id: 1, tipo: 'sugestao', mensagem: 'Seria bom ter aulas de Python', data: '2024-03-10', status: 'aberto' },
    { id: 2, tipo: 'reclamacao', mensagem: 'Ar condicionado da sala 3 não funciona', data: '2024-03-12', status: 'resolvido' }
  ]);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showReposicaoModal, setShowReposicaoModal] = useState(false);
  const [showPresencaModal, setShowPresencaModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // KPIs e métricas
  const [kpis, setKpis] = useState({
    taxaRetencao: 92,
    nps: 8.5,
    ticketMedio: 250,
    taxaConversao: 65,
    satisfacaoGeral: 4.3,
    tempoMedioConclusao: 6, // meses
    taxaPresenca: 93,
    receitaMensal: 32500
  });

  // Função para calcular total de aulas baseado na duração
  const calcularTotalAulas = (duracaoMeses, aulasSemanais = 1) => {
    return duracaoMeses * 4 * aulasSemanais; // 4 semanas por mês
  };

  // Função para verificar horários disponíveis
  const getHorariosDisponiveis = () => {
    const horarios = ['7h-9h', '9h-11h', '11h-13h', '13h-15h', '15h-17h', '17h-19h', '18h-20h'];
    const horariosOcupacao = {};
    
    horarios.forEach(h => {
      const ocupados = computadores.filter(pc => pc.horario === h && pc.status === 'ocupado').length;
      const manutencao = computadores.filter(pc => pc.horario === h && pc.status === 'manutencao').length;
      const disponiveis = 26 - ocupados - manutencao;
      
      horariosOcupacao[h] = {
        disponiveis,
        ocupados,
        manutencao,
        percentual: (disponiveis / 26) * 100
      };
    });
    
    return horariosOcupacao;
  };

  // Análise de gargalos
  const analisarGargalos = () => {
    const gargalos = [];
    
    if (kpis.taxaPresenca < 95) {
      gargalos.push({
        tipo: 'presenca',
        nivel: 'medio',
        mensagem: 'Taxa de presença abaixo do ideal (93%)',
        sugestao: 'Implementar sistema de lembretes via WhatsApp 1 dia antes da aula'
      });
    }
    
    const alunosInativos = students.filter(s => s.status === 'inativo').length;
    if (alunosInativos > students.length * 0.1) {
      gargalos.push({
        tipo: 'retencao',
        nivel: 'alto',
        mensagem: `${alunosInativos} alunos inativos (${((alunosInativos/students.length)*100).toFixed(1)}%)`,
        sugestao: 'Criar programa de recuperação com desconto especial para retorno'
      });
    }

    if (kpis.satisfacaoGeral < 4.5) {
      gargalos.push({
        tipo: 'satisfacao',
        nivel: 'medio',
        mensagem: 'Índice de satisfação pode melhorar',
        sugestao: 'Realizar pesquisa detalhada e implementar melhorias no material didático'
      });
    }

    return gargalos;
  };

  // Simular alertas
  useEffect(() => {
    const newAlerts = [];
    
    // Alerta de alunos próximos ao fim do curso
    students.forEach(student => {
      const dataFim = new Date(student.dataFim);
      const hoje = new Date();
      const diffTime = dataFim - hoje;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 90 && diffDays > 0) {
        newAlerts.push({
          id: `upsell-${student.id}`,
          tipo: 'upsell',
          mensagem: `${student.nome} termina o curso em ${diffDays} dias - Oportunidade de Upsell!`,
          aluno: student
        });
      }
    });

    // Alerta de alunos faltosos
    students.forEach(student => {
      if (student.faltas >= 4) {
        newAlerts.push({
          id: `inativo-${student.id}`,
          tipo: 'inativo',
          mensagem: `${student.nome} tem ${student.faltas} faltas e está INATIVO`,
          aluno: student
        });
      }
    });

    // Alerta de pagamentos próximos
    students.forEach(student => {
      if (student.proximoPagamento && !student.pagamentoCompleto) {
        const dataPagamento = new Date(student.proximoPagamento);
        const hoje = new Date();
        const diffTime = dataPagamento - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 7 && diffDays > 0) {
          newAlerts.push({
            id: `pagamento-${student.id}`,
            tipo: 'pagamento',
            mensagem: `Pagamento de ${student.nome} vence em ${diffDays} dias`,
            aluno: student
          });
        }
      }
    });

    setAlerts(newAlerts);
  }, [students]);

  const Login = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
                <span className="text-white text-2xl font-bold">IGF</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Sistema IGF</h1>
              <p className="text-blue-600 font-semibold mt-2">Educação que transforma</p>
            </div>

            {!showLogin ? (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setUserType('diretor');
                    setCurrentUser({ nome: 'Diretora Ana', tipo: 'diretor' });
                  }}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  Entrar como Diretor(a)
                </button>

                <button
                  onClick={() => {
                    setUserType('professor');
                    setCurrentUser({ nome: 'Prof. Carlos', tipo: 'professor' });
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Entrar como Professor
                </button>

                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Portal do Aluno
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={loginData.usuario}
                    onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu usuário"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.senha}
                      onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const aluno = students.find(s => s.usuario === loginData.usuario && s.senha === loginData.senha);
                    if (aluno) {
                      setUserType('aluno');
                      setCurrentUser({ nome: aluno.nome, tipo: 'aluno', id: aluno.id });
                    } else {
                      alert('Usuário ou senha incorretos!');
                    }
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Entrar
                </button>

                <button
                  onClick={() => {
                    setShowLogin(false);
                    setLoginData({ usuario: '', senha: '' });
                  }}
                  className="w-full text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Voltar
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <img src="/api/placeholder/100/100" alt="Mascote Deco" className="w-24 h-24 mx-auto" />
              <p className="text-sm text-gray-500 mt-2">Olá! Eu sou o Deco, seu assistente virtual!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => {
    const menuItems = {
      diretor: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'alunos', label: 'Alunos', icon: Users },
        { id: 'eventos', label: 'Eventos', icon: CalendarDays },
        { id: 'computadores', label: 'Computadores', icon: Monitor },
        { id: 'presenca', label: 'Presença', icon: UserCheck },
        { id: 'ouvidoria', label: 'Ouvidoria', icon: MessageSquare },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
        { id: 'configuracoes', label: 'Configurações', icon: Settings }
      ],
      professor: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'alunos', label: 'Alunos', icon: Users },
        { id: 'eventos', label: 'Eventos', icon: CalendarDays },
        { id: 'computadores', label: 'Computadores', icon: Monitor },
        { id: 'presenca', label: 'Presença', icon: UserCheck }
      ],
      aluno: [
        { id: 'dashboard', label: 'Meu Painel', icon: Home },
        { id: 'notas', label: 'Minhas Notas', icon: Award },
        { id: 'eventos', label: 'Eventos', icon: CalendarDays },
        { id: 'desempenho', label: 'Desempenho', icon: TrendingUp }
      ]
    };

    return (
      <div className="w-64 bg-white shadow-lg h-full">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">IGF</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{currentUser?.nome}</p>
              <p className="text-sm text-gray-500 capitalize">{currentUser?.tipo}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {menuItems[userType]?.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              setUserType('');
              setCurrentUser(null);
              setActiveTab('dashboard');
              setShowLogin(false);
              setLoginData({ usuario: '', senha: '' });
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const stats = {
      totalAlunos: students.length,
      alunosAtivos: students.filter(s => s.status === 'ativo').length,
      novosAlunos: 35,
      formandos: 40,
      inativos: students.filter(s => s.status === 'inativo').length,
      satisfacaoMedia: (students.reduce((acc, s) => acc + s.satisfacao, 0) / students.length).toFixed(1)
    };

    const gargalos = analisarGargalos();

    // Dashboard específico para alunos
    if (userType === 'aluno') {
      const alunoData = students.find(s => s.id === currentUser?.id);
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Meu Painel</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>

          {/* Pontos de Fidelidade */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Programa de Fidelidade</h3>
                <p className="text-purple-100">Continue comparecendo às aulas para ganhar cupons!</p>
              </div>
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-2" />
                <p className="text-3xl font-bold">{alunoData?.pontosFidelidade}</p>
                <p className="text-sm text-purple-100">pontos</p>
              </div>
            </div>
            {alunoData?.pontosFidelidade >= 100 && (
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <p className="text-sm">🎉 Parabéns! Você ganhou 1 cupom para o próximo sorteio!</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-4">Meu Progresso</h3>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${alunoData?.progresso}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{alunoData?.progresso}% concluído</p>
              </div>
              <div className="space-y-2">
                {alunoData?.modulos.map((modulo, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{modulo}</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">Aulas restantes: {alunoData?.aulasRestantes}</p>
                <p className="text-sm text-gray-600">Total de aulas: {alunoData?.totalAulas}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-4">Minha Frequência</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{alunoData?.presencas}</p>
                  <p className="text-sm text-gray-600">Presenças</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{alunoData?.faltas}</p>
                  <p className="text-sm text-gray-600">Faltas</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Taxa de presença: {((alunoData?.presencas / (alunoData?.presencas + alunoData?.faltas)) * 100).toFixed(1)}%
              </p>
              {alunoData?.faltas >= 3 && (
                <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                  ⚠️ Atenção: Você tem {alunoData?.faltas} faltas. Não perca mais aulas!
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700 mb-4">Próximas Aulas</h3>
              <div className="space-y-2">
                {alunoData?.diasAula.map((dia, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{dia} - {alunoData.turma.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Computador preferencial: {alunoData?.computadorPreferencial}
              </p>
              
              {/* Informação de pagamento */}
              {!alunoData?.pagamentoCompleto && alunoData?.proximoPagamento && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-700">Próximo Pagamento</p>
                  <p className="text-sm text-gray-600">
                    {new Date(alunoData.proximoPagamento).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-500">
                    Parcela {alunoData.parcelasPagas + 1} de {alunoData.parcelas}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-700 mb-4">Meus Eventos</h3>
            <div className="space-y-3">
              {alunoData?.eventos.map((evento, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">{evento}</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Dashboard para diretor
    if (userType === 'diretor') {
      const [statusFilter, setStatusFilter] = useState('todos');
      
      const alunosFiltrados = students.filter(student => {
        const dataMatricula = new Date(student.dataMatricula);
        const matchesMonth = dataMatricula.getMonth() + 1 === parseInt(filterMonth);
        const matchesYear = dataMatricula.getFullYear() === parseInt(filterYear);
        const matchesStatus = statusFilter === 'todos' || student.status === statusFilter;
        
        return matchesMonth && matchesYear && matchesStatus;
      });

      const statsFiltrados = {
        total: alunosFiltrados.length,
        ativos: alunosFiltrados.filter(s => s.status === 'ativo').length,
        inativos: alunosFiltrados.filter(s => s.status === 'inativo').length
      };

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>

          {/* Filtros simplificados */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                  <option value="4">Abril</option>
                  <option value="5">Maio</option>
                  <option value="6">Junho</option>
                  <option value="7">Julho</option>
                  <option value="8">Agosto</option>
                  <option value="9">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="ativo">Ativos</option>
                  <option value="inativo">Inativos</option>
                </select>
              </div>
            </div>

            {/* Resultado dos filtros */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              <p className="text-gray-600">
                Mostrando dados de <strong>{['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][filterMonth - 1]}/{filterYear}</strong>
                {statusFilter !== 'todos' && <span> - Status: <strong>{statusFilter}</strong></span>}
              </p>
              <div className="flex gap-4 mt-2">
                <span className="text-blue-600 font-medium">Total: {statsFiltrados.total}</span>
                <span className="text-green-600 font-medium">Ativos: {statsFiltrados.ativos}</span>
                <span className="text-red-600 font-medium">Inativos: {statsFiltrados.inativos}</span>
              </div>
            </div>
          </div>

          {/* Quadro Geral - Métricas Principais */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-4">Visão Geral - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-3xl font-bold">{stats.totalAlunos}</p>
                <p className="text-blue-100">Total de Alunos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.alunosAtivos}</p>
                <p className="text-blue-100">Alunos Ativos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.formandos}</p>
                <p className="text-blue-100">Formandos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.inativos}</p>
                <p className="text-blue-100">Inativos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.satisfacaoMedia}/5</p>
                <p className="text-blue-100">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Análise de Gargalos e Sugestões */}
          {gargalos.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Pontos de Atenção</h3>
              </div>
              <div className="space-y-3">
                {gargalos.map((gargalo, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-yellow-50">
                    <p className="font-medium text-gray-800 mb-1">{gargalo.mensagem}</p>
                    <p className="text-sm text-green-700">
                      <span className="font-medium">💡 Sugestão:</span> {gargalo.sugestao}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPIs Principais - Simplificado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{kpis.taxaRetencao}%</p>
              <p className="text-sm text-gray-600">Taxa de Retenção</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">R$ {kpis.receitaMensal.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Receita Mensal</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{kpis.taxaPresenca}%</p>
              <p className="text-sm text-gray-600">Taxa de Presença</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{kpis.taxaConversao}%</p>
              <p className="text-sm text-gray-600">Taxa de Conversão</p>
            </div>
          </div>

          {/* Alertas importantes */}
          {alerts.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Alertas Importantes</h3>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className={`p-4 rounded-lg flex items-start gap-3 ${
                    alert.tipo === 'upsell' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                    alert.tipo === 'inativo' ? 'bg-red-50 border-l-4 border-red-400' :
                    alert.tipo === 'pagamento' ? 'bg-green-50 border-l-4 border-green-400' :
                    'bg-blue-50 border-l-4 border-blue-400'
                  }`}>
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      alert.tipo === 'upsell' ? 'text-yellow-600' :
                      alert.tipo === 'inativo' ? 'text-red-600' :
                      alert.tipo === 'pagamento' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                    <p className="font-medium">{alert.mensagem}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Dashboard padrão para professor
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Quadro Geral - Métricas Principais */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl text-white">
          <h3 className="text-xl font-semibold mb-4">Quadro Geral - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-3xl font-bold">{stats.totalAlunos}</p>
              <p className="text-blue-100">Total de Alunos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.alunosAtivos}</p>
              <p className="text-blue-100">Alunos Ativos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.formandos}</p>
              <p className="text-blue-100">Formandos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.inativos}</p>
              <p className="text-blue-100">Inativos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.satisfacaoMedia}/5</p>
              <p className="text-blue-100">Satisfação</p>
            </div>
          </div>
        </div>

        {/* Alertas importantes */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Alertas Importantes</h3>
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg flex items-start gap-3 ${
                alert.tipo === 'upsell' ? 'bg-yellow-50 border border-yellow-200' :
                alert.tipo === 'inativo' ? 'bg-red-50 border border-red-200' :
                alert.tipo === 'pagamento' ? 'bg-green-50 border border-green-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <AlertCircle className={`w-5 h-5 mt-0.5 ${
                  alert.tipo === 'upsell' ? 'text-yellow-600' :
                  alert.tipo === 'inativo' ? 'text-red-600' :
                  alert.tipo === 'pagamento' ? 'text-green-600' :
                  'text-blue-600'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{alert.mensagem}</p>
                  {alert.tipo === 'upsell' && (
                    <button className="mt-2 text-sm text-yellow-700 hover:underline">
                      Ver módulos disponíveis →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Aulas de Hoje - Novo Layout */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-700 mb-4">Aulas de Hoje</h3>
          <div className="space-y-3">
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg">
                <div>
                  <p className="font-medium">7h-9h</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">5 alunos</p>
                  <button
                    onClick={() => setActiveTab('presenca')}
                    className="mt-1 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Marcar Presença
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg">
                <div>
                  <p className="font-medium">9h-11h</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">10 alunos</p>
                  <button
                    onClick={() => setActiveTab('presenca')}
                    className="mt-1 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Marcar Presença
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg">
                <div>
                  <p className="font-medium">13h-15h</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">8 alunos</p>
                  <button
                    onClick={() => setActiveTab('presenca')}
                    className="mt-1 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Marcar Presença
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horários das Turmas - Layout Melhorado */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-700 mb-4">Horários das Turmas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Horário</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Segunda</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Terça</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Quarta</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Quinta</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Sexta</th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Sábado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">7h-9h</td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">9h-11h</td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">11h-13h</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
                  </td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">13h-15h</td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">15h-17h</td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                  <td className="py-3 px-3 text-center"><div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">17h-19h</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
                  </td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium text-gray-700">18h-20h</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
                  </td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                  <td className="py-3 px-3 text-center">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Aula Presencial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
              <span>Aula Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span>-</span>
              <span>Sem Aula</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AlunosView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');
    const [expandedStudent, setExpandedStudent] = useState(null);

    const filteredStudents = students.filter(student => {
      const matchesSearch = student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'todos' || student.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Alunos</h2>
          {userType !== 'aluno' && (
            <button
              onClick={() => {
                setSelectedStudent(null);
                setShowStudentModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Aluno
            </button>
          )}
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar aluno ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>
        </div>

        {/* Lista de alunos */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{student.nome}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.status === 'ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                      {student.pontosFidelidade >= 100 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          100% Presença
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Telefone</p>
                        <p className="font-medium">{student.telefone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Responsável</p>
                        <p className="font-medium">{student.responsavel}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Turma</p>
                        <p className="font-medium">{student.turma}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Dias de Aula</p>
                        <p className="font-medium">{student.diasAula.join(', ')}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.progresso}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{student.progresso}%</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600">✓ {student.presencas} presenças</span>
                        <span className="text-red-600">✗ {student.faltas} faltas</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Aulas restantes: </span>
                        <span className="font-medium">{student.aulasRestantes}</span>
                      </div>
                    </div>

                    {/* Informações financeiras */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Mensalidade</p>
                          <p className="font-medium">R$ {student.mensalidade}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Parcelas</p>
                          <p className="font-medium">{student.parcelasPagas}/{student.parcelas}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Forma de Pagamento</p>
                          <p className="font-medium capitalize">{student.formaPagamento}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Próximo Pagamento</p>
                          {student.pagamentoCompleto ? (
                            <p className="font-medium text-green-600">Pago Completo ✓</p>
                          ) : (
                            <p className="font-medium text-orange-600">
                              {student.proximoPagamento ? new Date(student.proximoPagamento).toLocaleDateString('pt-BR') : '-'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${
                        expandedStudent === student.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowStudentModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Área expandida com histórico */}
                {expandedStudent === student.id && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-gray-700 mb-4">Histórico do Aluno</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">Pós-Venda</h5>
                        <p className="text-sm text-gray-600">{student.historico.posVenda}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">Comportamento em Sala</h5>
                        <p className="text-sm text-gray-600">{student.historico.comportamentoSala}</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">Insatisfações</h5>
                        <p className="text-sm text-gray-600">{student.historico.insatisfacoes}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Monitor className="w-4 h-4 text-gray-500" />
                        <span>PC Preferencial: {student.computadorPreferencial}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span>Atividades Extras: {student.atividadesExtras ? 'Sim' : 'Não'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarCheck className="w-4 h-4 text-gray-500" />
                        <span>Duração: {student.duracaoCurso} meses ({student.totalAulas} aulas)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EventosView = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Eventos</h2>
          {userType !== 'aluno' && (
            <button
              onClick={() => setShowEventModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Evento
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{evento.titulo}</h3>
              <p className="text-sm text-gray-600 mb-4">{evento.descricao}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(evento.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{evento.horario}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{evento.inscritos}/{evento.vagas} inscritos</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(evento.inscritos / evento.vagas) * 100}%` }}
                />
              </div>

              {userType === 'aluno' ? (
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Inscrever-se
                </button>
              ) : (
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Editar
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ver Inscritos
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ComputadoresView = () => {
    const [selectedPC, setSelectedPC] = useState(null);
    const statusColors = {
      disponivel: 'bg-green-100 text-green-800 border-green-300',
      ocupado: 'bg-red-100 text-red-800 border-red-300',
      manutencao: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };

    const horariosDisponibilidade = getHorariosDisponiveis();

    const handleStatusChange = (pcId, newStatus) => {
      setComputadores(prev => prev.map(pc => 
        pc.id === pcId ? { ...pc, status: newStatus, aluno: newStatus === 'disponivel' ? '' : pc.aluno } : pc
      ));
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Quadro de Computadores</h2>
          {userType === 'professor' && (
            <button
              onClick={() => setShowReposicaoModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Agendar Reposição
            </button>
          )}
        </div>

        {/* Horários disponíveis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Disponibilidade por Horário</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(horariosDisponibilidade).map(([horario, info]) => (
              <div key={horario} className="text-center">
                <p className="font-medium text-sm mb-2">{horario}</p>
                <div className={`p-3 rounded-lg ${
                  info.percentual > 50 ? 'bg-green-50' : 
                  info.percentual > 20 ? 'bg-yellow-50' : 
                  'bg-red-50'
                }`}>
                  <p className={`text-2xl font-bold ${
                    info.percentual > 50 ? 'text-green-600' : 
                    info.percentual > 20 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {info.disponiveis}
                  </p>
                  <p className="text-xs text-gray-600">disponíveis</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {info.percentual.toFixed(0)}% livre
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            💡 Dica: Horários com mais de 50% de disponibilidade são ideais para matricular novos alunos
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-600 mb-4">Total: 26 computadores por horário</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {computadores.map((pc) => (
              <div
                key={pc.id}
                className={`p-3 rounded-lg border-2 ${statusColors[pc.status]} transition-all hover:scale-105 cursor-pointer relative`}
                onClick={() => setSelectedPC(pc)}
              >
                <div className="text-center">
                  <Monitor className="w-6 h-6 mx-auto mb-1" />
                  <p className="font-semibold text-sm">{pc.nome}</p>
                  <p className="text-xs capitalize">{pc.status}</p>
                  {pc.horario && (
                    <p className="text-xs mt-1">{pc.horario}</p>
                  )}
                  {pc.aluno && (
                    <p className="text-xs font-medium mt-1">{pc.aluno}</p>
                  )}
                </div>
                
                {/* Menu de ações rápidas */}
                {userType !== 'aluno' && selectedPC?.id === pc.id && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(pc.id, 'disponivel');
                        setSelectedPC(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 rounded flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Disponível
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(pc.id, 'ocupado');
                        setSelectedPC(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 rounded flex items-center gap-2"
                    >
                      <X className="w-4 h-4 text-red-600" />
                      Ocupado
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(pc.id, 'manutencao');
                        setSelectedPC(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded flex items-center gap-2"
                    >
                      <Wrench className="w-4 h-4 text-yellow-600" />
                      Manutenção
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Manutenção</span>
            </div>
          </div>

          {userType !== 'aluno' && (
            <p className="text-sm text-gray-500 mt-4">
              💡 Clique em um computador para alterar seu status
            </p>
          )}
        </div>

        {/* Lista de reposições agendadas */}
        {reposicoes.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Reposições Agendadas</h3>
            <div className="space-y-2">
              {reposicoes.map((repo, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">{repo.aluno}</p>
                    <p className="text-sm text-gray-600">{repo.data} - {repo.horario}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const PresencaView = () => {
    const [selectedHorario, setSelectedHorario] = useState('9h-11h');
    const [presencaAlunos, setPresencaAlunos] = useState({});
    
    // Simular lista de alunos do horário
    const alunosDoHorario = students.filter(s => s.status === 'ativo').slice(0, 10);

    const marcarPresenca = (alunoId, presente) => {
      setPresencaAlunos(prev => ({
        ...prev,
        [alunoId]: presente
      }));
    };

    const salvarPresenca = () => {
      // Aqui seria a lógica para salvar no banco
      const faltosos = alunosDoHorario.filter(a => presencaAlunos[a.id] === false);
      
      if (faltosos.length > 0) {
        alert(`Enviando mensagem para ${faltosos.length} aluno(s) faltoso(s)...`);
        // Aqui seria o envio automático das mensagens
      }
      
      alert('Presença salva com sucesso!');
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Controle de Presença</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o Horário
            </label>
            <select
              value={selectedHorario}
              onChange={(e) => setSelectedHorario(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7h-9h">7h-9h</option>
              <option value="9h-11h">9h-11h</option>
              <option value="11h-13h">11h-13h</option>
              <option value="13h-15h">13h-15h</option>
              <option value="15h-17h">15h-17h</option>
            </select>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">
              Alunos do horário {selectedHorario} - Total: {alunosDoHorario.length}
            </h3>
            
            {alunosDoHorario.map((aluno) => (
              <div key={aluno.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium">{aluno.nome}</p>
                  <p className="text-sm text-gray-500">
                    {aluno.telefone} | Responsável: {aluno.responsavel}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => marcarPresenca(aluno.id, true)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      presencaAlunos[aluno.id] === true
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => marcarPresenca(aluno.id, false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      presencaAlunos[aluno.id] === false
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>✓ Presentes: {Object.values(presencaAlunos).filter(p => p === true).length}</p>
              <p>✗ Ausentes: {Object.values(presencaAlunos).filter(p => p === false).length}</p>
            </div>
            
            <button
              onClick={salvarPresenca}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Presença
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Ao salvar, mensagens automáticas serão enviadas para alunos e responsáveis dos faltosos
            </p>
          </div>
        </div>
      </div>
    );
  };

  const OuvidoriaView = () => {
    const [novaMsg, setNovaMsg] = useState('');
    const [tipoMsg, setTipoMsg] = useState('sugestao');

    const handleSubmit = () => {
      if (novaMsg.trim()) {
        setOuvidoria([...ouvidoria, {
          id: ouvidoria.length + 1,
          tipo: tipoMsg,
          mensagem: novaMsg,
          data: new Date().toISOString().split('T')[0],
          status: 'aberto'
        }]);
        setNovaMsg('');
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Canal de Ouvidoria</h2>

        {userType === 'aluno' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Enviar Sugestão ou Reclamação</h3>
            <div className="space-y-4">
              <select
                value={tipoMsg}
                onChange={(e) => setTipoMsg(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sugestao">Sugestão</option>
                <option value="reclamacao">Reclamação</option>
              </select>
              <textarea
                value={novaMsg}
                onChange={(e) => setNovaMsg(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Mensagens Recebidas</h3>
            <div className="space-y-4">
              {ouvidoria.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg border ${
                    msg.tipo === 'sugestao' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          msg.tipo === 'sugestao' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {msg.tipo}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(msg.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.mensagem}</p>
                    </div>
                    {userType !== 'aluno' && (
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        msg.status === 'resolvido' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {msg.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StudentModal = () => {
    if (!showStudentModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-4xl w-full my-8">
          <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedStudent ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
            </h3>
            <button
              onClick={() => setShowStudentModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Dados Pessoais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.nome}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedStudent?.telefone}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedStudent?.dataNascimento}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsável
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.responsavel}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone do Responsável
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedStudent?.telefoneResponsavel}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.endereco}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dados Acadêmicos */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Dados Acadêmicos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turma
                    </label>
                    <select
                      defaultValue={selectedStudent?.turma}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Segunda 7h-9h</option>
                      <option>Segunda 9h-11h</option>
                      <option>Segunda 13h-15h</option>
                      <option>Segunda 15h-17h</option>
                      <option>Terça 7h-9h</option>
                      <option>Terça 9h-11h</option>
                      <option>Quarta 17h-19h (Online)</option>
                      <option>Quarta 18h-20h (Online)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dias de Aula
                    </label>
                    <div className="flex gap-2">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                        <label key={dia} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={selectedStudent?.diasAula?.includes(dia)}
                            className="mr-1"
                          />
                          <span className="text-sm">{dia}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedStudent?.dataInicio}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duração do Curso (meses)
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedStudent?.duracaoCurso || 6}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        const meses = parseInt(e.target.value) || 0;
                        const totalAulas = calcularTotalAulas(meses);
                        // Aqui você atualizaria o estado
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Total de aulas: {selectedStudent?.totalAulas || calcularTotalAulas(6)}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Módulos
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Excel Básico', 'Excel Avançado', 'Word Básico', 'Word Avançado', 'PowerPoint', 'Internet Segura'].map((modulo) => (
                        <label key={modulo} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked={selectedStudent?.modulos?.includes(modulo)}
                            className="text-blue-600"
                          />
                          <span className="text-sm">{modulo}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Computador Preferencial
                    </label>
                    <select
                      defaultValue={selectedStudent?.computadorPreferencial}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Sem preferência</option>
                      {computadores.map((pc) => (
                        <option key={pc.id}>{pc.nome}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedStudent?.atividadesExtras}
                        className="text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Participa de Atividades Extras</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dados Financeiros */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Dados Financeiros</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor da Mensalidade
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedStudent?.mensalidade}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="R$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Parcelas
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedStudent?.parcelas}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Forma de Pagamento
                    </label>
                    <select
                      defaultValue={selectedStudent?.formaPagamento}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pix">PIX</option>
                      <option value="boleto">Boleto</option>
                      <option value="cartao">Cartão de Crédito</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 mt-8">
                      <input
                        type="checkbox"
                        defaultChecked={selectedStudent?.pagamentoCompleto}
                        className="text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Pagamento Completo</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Histórico */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Histórico e Observações</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pós-Venda
                    </label>
                    <textarea
                      defaultValue={selectedStudent?.historico?.posVenda}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Como foi o atendimento pós-venda..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comportamento em Sala
                    </label>
                    <textarea
                      defaultValue={selectedStudent?.historico?.comportamentoSala}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Como o aluno se comporta em sala..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insatisfações
                    </label>
                    <textarea
                      defaultValue={selectedStudent?.historico?.insatisfacoes}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Pontos de insatisfação do aluno..."
                    />
                  </div>
                </div>
              </div>

              {/* Dados de Acesso */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Dados de Acesso</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuário
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.usuario}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.senha}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReposicaoModal = () => {
    if (!showReposicaoModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Agendar Reposição</h3>
            <button
              onClick={() => setShowReposicaoModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aluno
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {students.map((student) => (
                    <option key={student.id}>{student.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Reposição
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>7h-9h</option>
                  <option>9h-11h</option>
                  <option>11h-13h</option>
                  <option>13h-15h</option>
                  <option>15h-17h</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Computador
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Qualquer disponível</option>
                  {computadores.filter(pc => pc.status === 'disponivel').map((pc) => (
                    <option key={pc.id}>{pc.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowReposicaoModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setReposicoes([...reposicoes, {
                    aluno: 'João Silva',
                    data: '20/03/2024',
                    horario: '15h-17h',
                    computador: 'PC-15'
                  }]);
                  setShowReposicaoModal(false);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal
  if (!userType) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'alunos' && <AlunosView />}
          {activeTab === 'eventos' && <EventosView />}
          {activeTab === 'computadores' && <ComputadoresView />}
          {activeTab === 'presenca' && <PresencaView />}
          {activeTab === 'ouvidoria' && <OuvidoriaView />}
          {activeTab === 'notas' && userType === 'aluno' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Minhas Notas</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600">Suas notas e avaliações aparecerão aqui.</p>
              </div>
            </div>
          )}
          {activeTab === 'desempenho' && userType === 'aluno' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Meu Desempenho</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Progresso Geral</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">65% concluído</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">28</p>
                      <p className="text-sm text-gray-600">Presenças</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">2</p>
                      <p className="text-sm text-gray-600">Faltas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <StudentModal />
      <ReposicaoModal />
    </div>
  );
};

export default IGFSaaS;