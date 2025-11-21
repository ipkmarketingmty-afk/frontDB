# BlackVault Inventory

Sistema de gestión de inventario con Next.js 14+ y PostgreSQL externo diseñado para despliegue en VPS con Docker.

![BlackVault](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Compatible-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

## ✨ Características

- **Conexión Dinámica a PostgreSQL**: Conecta a cualquier base de datos PostgreSQL proporcionando credenciales
- **Gestión de Imágenes BYTEA**: Las imágenes se almacenan como datos binarios en PostgreSQL con conversión automática a Base64
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos con nombre, descripción, precio, stock e imagen
- **Diseño Pure Black Mode**: Estética minimalista con fondo #000000, tarjetas #0A0A0A, bordes #262626, texto #EDEDED
- **Inicialización Automática**: Botón para crear la tabla `products` si no existe
- **Seguridad Avanzada**: Encriptación AES-256-GCM para credenciales en cookies httpOnly

## 🚀 Despliegue en Easypanel

### Paso 1: Preparar el Código

1. Sube este código a tu repositorio Git (GitHub, GitLab, etc.)

### Paso 2: Crear Aplicación en Easypanel

1. Accede a tu panel de Easypanel
2. Crea una nueva aplicación
3. Conecta tu repositorio Git
4. Easypanel detectará automáticamente el `Dockerfile`

### Paso 3: Configurar Variables de Entorno

**IMPORTANTE**: Configura la variable de entorno obligatoria:

```
SESSION_SECRET=tu_clave_secreta_muy_larga_y_aleatoria_minimo_32_caracteres
```

Para generar una clave segura, puedes usar:

```bash
openssl rand -base64 32
```

### Paso 4: Desplegar

1. Haz clic en "Deploy"
2. Easypanel construirá la imagen Docker y la ejecutará
3. Tu aplicación estará disponible en el puerto 5000

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 20+
- npm

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variable de entorno
export SESSION_SECRET="tu_clave_secreta_local"

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

### Build para Producción

```bash
npm run build
npm run start
```

## 🐳 Docker Manual

### Build

```bash
docker build -t blackvault-inventory .
```

### Ejecutar

```bash
docker run -p 5000:5000 -e SESSION_SECRET="tu_clave_secreta" blackvault-inventory
```

## 📋 Uso

### 1. Conectar a Base de Datos

Al acceder a la aplicación, verás un formulario para conectarte a tu PostgreSQL:

- **Host**: IP o dominio del servidor PostgreSQL
- **Puerto**: Típicamente 5432
- **Usuario**: Usuario de PostgreSQL
- **Contraseña**: Contraseña del usuario
- **Base de Datos**: Nombre de la base de datos

### 2. Inicializar Tabla

Si la tabla `products` no existe:

1. Haz clic en el botón "Crear Tabla"
2. La tabla se creará automáticamente con el esquema necesario

### 3. Gestionar Productos

- **Agregar**: Clic en "+ Nuevo Producto"
- **Editar**: Clic en "Editar" en cualquier producto
- **Eliminar**: Clic en "Eliminar" (confirmación requerida)
- **Imágenes**: Máximo 5MB por imagen

## 🗄️ Esquema de Base de Datos

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  image BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Seguridad

- **Encriptación AES-256-GCM**: Credenciales encriptadas antes de almacenarse en cookies
- **Derivación de Clave Scrypt**: Clave de encriptación derivada de SESSION_SECRET
- **Cookies HttpOnly**: Inaccesibles desde JavaScript del navegador
- **IV Aleatorio**: Vector de inicialización único por sesión
- **Persistencia sin Estado**: Sesiones sobreviven a reinicios sin servicios adicionales
- **SQL Injection Protection**: Queries parametrizadas
- **Fallo Seguro**: Aplicación no inicia sin SESSION_SECRET

## 📁 Estructura del Proyecto

```
/
├── app/
│   ├── api/
│   │   ├── auth/          # Autenticación
│   │   └── products/      # CRUD de productos
│   ├── inventory/         # Página del inventario
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Página de login
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
├── lib/
│   └── db.ts             # Utilidades de PostgreSQL
├── Dockerfile            # Build multi-stage para producción
└── package.json          # Dependencias

```

## 🎨 Stack Tecnológico

- **Frontend/Backend**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: PostgreSQL (conexión con pg/node-postgres)
- **Seguridad**: Cookies httpOnly con AES-256-GCM
- **Despliegue**: Docker (multi-stage build)

## 📝 Notas Importantes

1. **SESSION_SECRET**: Debe ser único y secreto. Nunca lo compartas ni lo subas a repositorios públicos.
2. **Credenciales de BD**: Se almacenan encriptadas en cookies del navegador. Solo son accesibles por el servidor.
3. **Imágenes**: Almacenadas en BYTEA. Considera límites de almacenamiento de tu PostgreSQL.
4. **Reinicios**: Las sesiones sobreviven a reinicios del servidor.

## 🤝 Soporte

Para problemas o dudas:
- Verifica que SESSION_SECRET esté configurado correctamente
- Comprueba la conexión a PostgreSQL
- Revisa los logs de Docker/Easypanel

## 📄 Licencia

Este proyecto está disponible para uso personal y comercial.

---

**BlackVault Inventory** - Sistema de gestión de inventario profesional con seguridad de nivel empresarial.
