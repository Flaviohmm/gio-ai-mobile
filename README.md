### 📸✨ Gio_AI Mobile - Edição de Fotos com Inteligência Artificial

Transforme suas fotos com o poder da Inteligência Artificial

#### 🎯 Sobre o Projeto

O **Gio_AI Mobile** é um aplicativo moderno de edição de fotos desenvolvido com **Expo** e **React Native**. Ele permite transformar suas imagens com inteligência artificial, trocando roupas, cenários e aplicando estilos visuais com apenas um prompt de texto.
Criado para criadores de conteúdo, influenciadores, fotógrafos e qualquer pessoa que queira explorar sua criatividade de forma rápida e intuitiva.

**🌟 Diferencial**

- **✅ 100% Mobile First** - Otimizado para smartphones
- **✅ Interface Moderna** - Design com gradientes e glassmorphism
- **✅ Zero Configuração** - Funciona out-of-the-box
- **✅ Cross-Platform** - iOS e Android com o mesmo código

---

#### 🚀 Funcionalidades
<br>

<div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" class="px-6 py-3 font-semibold">
                    Ícone
                </th>
                <th scope="col" class="px-6 py-3 font-semibold">
                    Funcionalidade
                </th>
                <th scope="col" class="px-6 py-3 font-semibold">
                    Descrição
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-neutral-primary border-b border-default">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    👕
                </th>
                <td class="px-6 py-4">
                    Troque Roupas
                </td>
                <td class="px-6 py-4">
                    Vista qualquer estilo: casual, social, fantasia ou uniforme com um único prompt.
                </td>
            </tr>
            <tr class="bg-neutral-primary border-b border-default">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    🏔️
                </th>
                <td class="px-6 py-4">
                    Mude Cenários
                </td>
                <td class="px-6 py-4">
                    	Praia, cidade futurista, estúdio profissional ou floresta. Você escolhe.
                </td>
            </tr>
            <tr class="bg-neutral-primary">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    🎨
                </th>
                <td class="px-6 py-4">
                    Estilos Variados
                </td>
                <td class="px-6 py-4">
                    Realista, artístico, cinematográfico ou cartoon. Sua criatividade, seu estilo.
                </td>
            </tr>
            <tr class="bg-neutral-primary">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    ⚡
                </th>
                <td class="px-6 py-4">
                    Ultra Rápido
                </td>
                <td class="px-6 py-4">
                    Resultados de alta qualidade em segundos. Sem espera, só criação.
                </td>
            </tr>
            <tr class="bg-neutral-primary">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    ✨
                </th>
                <td class="px-6 py-4">
                    Prompt Simples
                </td>
                <td class="px-6 py-4">
                    Descreva o que imagina e a IA faz acontecer. Simples assim.
                </td>
            </tr>
            <tr class="bg-neutral-primary">
                <th scope="row" class="px-6 py-4 font-medium text-center whitespace-nowrap">
                    📱
                </th>
                <td class="px-6 py-4">
                    Mobile First
                </td>
                <td class="px-6 py-4">
                    Interface intuitiva otimizada para criar em qualquer lugar.
                </td>
            </tr>
        </tbody>
    </table>
</div>
<br>

---

#### 🛠️ Tecnologias Utilizadas

- **Expo** - Framework React Native
- **React Native** - Framework mobile
- **TypeScript** - Tipagem estática
- **Expo Image Picker** - Seleção de imagens
- **Expo Linear Gradient** - Gradientes
- **AI Image Processing** - API de processamento de imagens (a integrar)

<br>

---

#### 📦 Instalação

**Pré-requisitos**

- Node.js >= 18.x
- npm ou yarn
- Expo CLI
- Expo Go (para testar no dispositivo)

**Passo a Passo**
1. Clone o repositório

```bash
git clone https://github.com/Flaviohmm/gio-ai-mobile.git 
cd gio-ai-mobile
```

2. Instale as dependencias
```bash
npm install
# ou
yarn install
```

3. Instale as dependências do Expo

```bash
npx expo install expo-image-picker expo-linear-gradient
```

4. Inicie o projeto

```bash
npx expo start
```

5. Execute no dispositivo
    - Escaneie o QR code com o app Expo Go
    - Ou pressione ```a``` para Android Emulator
    - Ou pressione ```i``` para iOS Simulator

<br>

---

#### 🎮 Como Usar

**1️⃣ Selecionar Imagem**

Na tela inicial, escolha entre:

- 📷 **Escolher Foto** - Selecione da galeria
- 📸 **Tirar Foto** - Capture uma nova foto

**2️⃣ Descrever Transformação**

No editor, digite um prompt descrevendo o que deseja:

```
Exemplos:
- "Transforme em estilo cartoon colorido"
- "Troque a roupa por um terno elegante"
- "Mude o fundo para uma praia ao pôr do sol"
- "Aplique estilo Van Gogh impressionista"
```

**3️⃣ Processar com IA**

Clique em ✨ Processar com IA e aguarde o resultado

**4️⃣ Salvar ou Compartilhar**

Salve a imagem editada ou compartilhe nas redes sociais

<br>

---

#### 📱 Build para Produção

**Android (APK)**

```bash
# Build de desenvolvimento
eas build --platform android --profile preview

# Build de produção
eas build --platform android --profile production
```

**iOS (IPA)**

```bash
# Build de desenvolvimento
eas build --platform ios --profile preview

# Build de produção
eas build --platform ios --profile production
```

**Configurar EAS Build**

1. Instale o EAS CLI

```bash
npm install -g eas-cli
```

2. Login no Expo

```bash
eas login
```

3. Configure o projeto

```
eas build:configure
```

<br>

---

#### 🔧 Configuração

**app.json**

```json
{
  "expo": {
    "name": "Gio_AI",
    "slug": "gio-ai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#667eea"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gio.ai",
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "Gio_AI precisa acessar suas fotos para edição com IA.",
        "NSCameraUsageDescription": "Gio_AI precisa acessar a câmera para capturar fotos."
      }
    },
    "android": {
      "package": "com.gio.ai",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#667eea"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

<br>

---

#### 🔌 Integração com API de IA

Para integrar uma API real de processamento de imagens, modifique a função ```processImage()```:

**Exemplo com Replicate API**

```bash
const processImage = async () => {
  if (!prompt.trim()) {
    Alert.alert('Atenção', 'Digite um prompt!');
    return;
  }

  setIsProcessing(true);

  try {
    // Converta a imagem para base64
    const base64 = await FileSystem.readAsStringAsync(selectedImage!, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Chame sua API de IA
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': 'Token YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'MODEL_VERSION',
        input: {
          image: `data:image/jpeg;base64,${base64}`,
          prompt: prompt,
        }
      })
    });

    const data = await response.json();
    setResultImage(data.output);
    Alert.alert('Sucesso', 'Imagem processada! 🎉');
  } catch (error) {
    Alert.alert('Erro', 'Falha ao processar imagem');
  } finally {
    setIsProcessing(false);
  }
};
```

**APIs Recomendadas**

- **Replicate** - Modelos de IA variados
- **Stability AI** - Stable Diffusion
- **RunwayML** - Edição generativa
- **Leonardo.AI** - Geração de imagens

<br>

---

#### 📁 Estrutura do Projeto

```
gio-ai-mobile/
│
├── assets/                 # Imagens e recursos estáticos
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
├── App.tsx                 # Componente principal
├── app.json                # Configuração do Expo
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
└── README.md               # Documentação
```

<br>

---

#### 🎨 Customização

**Alterar Cores do Gradiente**

```typescript
// No componente LinearGradient
colors={['#667eea', '#764ba2', '#f093fb']}

// Suas cores personalizadas
colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}

```

**Adicionar Nova Funcionalidade**

```typescript
const newFeature = {
  emoji: '🎭',
  title: 'Efeitos Especiais',
  description: 'Adicione efeitos cinematográficos profissionais.',
};

features.push(newFeature);

```

<br>

---

#### 🐛 Solução de Problemas

**Erro de Permissões**

Se o app não solicitar permissões:

```bash
# Limpe o cache
npx expo start --clear

# Reinstale no dispositivo
```

**Build Failed**

```bash
# Limpe node_modules
rm -rf node_modules package-lock.json
npm install

# Limpe cache do Expo
npx expo start --clear
```

**Imagem não carrega**

Verifique as permissões no ```app.json``` e nas configurações do dispositivo.

<br>

---

#### 📄 Licença

Este projeto está sob a licença MIT. 

```
MIT License

Copyright (c) 2025 Flavio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

<br>

---

#### 👨‍💻 Autor

**Flavio Macedo**

- GitHub: [@Flaviohmm](https://github.com/Flaviohmm)
- LinkedIn: https://www.linkedin.com/in/flavio-henrique-m2/
- Email: fhenrique609@gmail.com

<br>

---

#### 🙏 Agradecimentos

- Expo Team - Framework incrível
- React Native Community - Suporte e recursos
- Anthropic - Inspiração em IA
- Todos os contribuidores