<script>
export default {
  name: 'App',
  data() {
    return {
      pessoa: {
        nome: '',
        telefone: '',
        cpf: '',
        email: ''
      },
      cadastros: [],
      editando: false,
      pessoaEditandoId: null,
      filtro: ''
    }
  },
  computed: {
    cadastrosFiltrados() {
      if (!this.filtro) return this.cadastros;
      
      return this.cadastros.filter(cadastro =>
        cadastro.nome.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  },
  methods: {
    salvarCadastro() {
      // Validação básica
      if (!this.validarFormulario()) return;

      if (this.editando) {
        // Atualizar cadastro existente
        const index = this.cadastros.findIndex(c => c.id === this.pessoaEditandoId);
        if (index !== -1) {
          this.cadastros[index] = { ...this.pessoa, id: this.pessoaEditandoId };
        }
      } else {
        // Adicionar novo cadastro
        const novoCadastro = {
          ...this.pessoa,
          id: Date.now() // ID simples baseado no timestamp
        };
        this.cadastros.unshift(novoCadastro);
      }

      this.limparFormulario();
      this.salvarNoLocalStorage();
    },

    editarCadastro(cadastro) {
      this.pessoa = { ...cadastro };
      this.editando = true;
      this.pessoaEditandoId = cadastro.id;
      
      // Scroll para o formulário
      document.querySelector('.form-container').scrollIntoView({ 
        behavior: 'smooth' 
      });
    },

    excluirCadastro(id) {
      if (confirm('Tem certeza que deseja excluir este cadastro?')) {
        this.cadastros = this.cadastros.filter(c => c.id !== id);
        this.salvarNoLocalStorage();
      }
    },

    limparFormulario() {
      this.pessoa = {
        nome: '',
        telefone: '',
        cpf: '',
        email: ''
      };
      this.editando = false;
      this.pessoaEditandoId = null;
    },

    validarFormulario() {
      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.pessoa.email)) {
        alert('Por favor, insira um email válido.');
        return false;
      }

      // Validação de CPF (formato básico)
      const cpfLimpo = this.pessoa.cpf.replace(/\D/g, '');
      if (cpfLimpo.length !== 11) {
        alert('CPF deve ter 11 dígitos.');
        return false;
      }

      // Verificar se CPF já existe (exceto na edição atual)
      const cpfExistente = this.cadastros.find(c => 
        c.cpf === this.pessoa.cpf && 
        (!this.editando || c.id !== this.pessoaEditandoId)
      );
      
      if (cpfExistente) {
        alert('CPF já cadastrado!');
        return false;
      }

      return true;
    },

    salvarNoLocalStorage() {
      localStorage.setItem('cadastrosPessoas', JSON.stringify(this.cadastros));
    },

    carregarDoLocalStorage() {
      const dados = localStorage.getItem('cadastrosPessoas');
      if (dados) {
        this.cadastros = JSON.parse(dados);
      }
    }
  },
  mounted() {
    this.carregarDoLocalStorage();
  }
}

</script>

<template>
  <div id="app">
    <div class="container">
      <h1>📋 Sistema de Cadastro</h1>
      
      <!-- Formulário de Cadastro -->
      <div class="form-container">
        <h2>{{ editando ? 'Editar Cadastro' : 'Novo Cadastro' }}</h2>
        <form @submit.prevent="salvarCadastro" class="cadastro-form">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              v-model="pessoa.nome"
              required
              placeholder="Digite o nome completo"
            >
          </div>

          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              v-model="pessoa.telefone"
              required
              placeholder="(11) 99999-9999"
              v-mask="'(##) #####-####'"
            >
          </div>

          <div class="form-group">
            <label for="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              v-model="pessoa.cpf"
              required
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
            >
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="pessoa.email"
              required
              placeholder="exemplo@email.com"
            >
          </div>

          <div class="form-buttons">
            <button type="submit" class="btn-primary">
              {{ editando ? 'Atualizar' : 'Cadastrar' }}
            </button>
            <button 
              type="button" 
              class="btn-secondary" 
              @click="limparFormulario"
              v-if="editando"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de Cadastros -->
      <div class="lista-container">
        <h2>Cadastros Realizados</h2>
        
        <div class="search-container">
          <input
            type="text"
            v-model="filtro"
            placeholder="Buscar por nome..."
            class="search-input"
          >
        </div>

        <div v-if="cadastrosFiltrados.length === 0" class="empty-state">
          Nenhum cadastro encontrado
        </div>

        <div v-else class="cadastros-list">
          <div 
            v-for="cadastro in cadastrosFiltrados" 
            :key="cadastro.id"
            class="cadastro-item"
          >
            <div class="cadastro-info">
              <h3>{{ cadastro.nome }}</h3>
              <p><strong>Telefone:</strong> {{ cadastro.telefone }}</p>
              <p><strong>CPF:</strong> {{ cadastro.cpf }}</p>
              <p><strong>Email:</strong> {{ cadastro.email }}</p>
            </div>
            <div class="cadastro-actions">
              <button 
                @click="editarCadastro(cadastro)" 
                class="btn-edit"
              >
                ✏️ Editar
              </button>
              <button 
                @click="excluirCadastro(cadastro.id)" 
                class="btn-delete"
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

h2 {
  color: #34495e;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.form-container, .lista-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.cadastro-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

input {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.form-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
  padding: 8px 15px;
  font-size: 14px;
}

.btn-edit:hover {
  background-color: #e67e22;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  padding: 8px 15px;
  font-size: 14px;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.cadastros-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cadastro-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  transition: transform 0.2s;
}

.cadastro-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.cadastro-info h3 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.cadastro-info p {
  margin-bottom: 4px;
  color: #555;
}

.cadastro-actions {
  display: flex;
  gap: 10px;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .form-container, .lista-container {
    padding: 20px;
  }
  
  .cadastro-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .cadastro-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
