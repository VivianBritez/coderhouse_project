## API de Productos

### Descripción
Esta API proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar productos.

### Rutas Disponibles

---

### Obtener Todos los Productos

- **URL**
  - `/api/products`
- **Método HTTP**
  - `GET`
- **Descripción**
  - Obtiene una lista de todos los productos disponibles.
- **Parámetros de Consulta**
  - Ninguno
- **Respuestas**
  - 200 OK: La solicitud se completó satisfactoriamente.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Obtener un Producto por ID

- **URL**
  - `/api/productos/:id`
- **Método HTTP**
  - `GET`
- **Descripción**
  - Obtiene un producto específico por su ID.
- **Parámetros de Ruta**
  - `id` (string): El ID único del producto.
- **Respuestas**
  - 200 OK: La solicitud se completó satisfactoriamente.
  - 400 Solicitud Incorrecta: El producto con el ID especificado no fue encontrado.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Crear un Nuevo Producto

- **URL**
  - `/api/productos`
- **Método HTTP**
  - `POST`
- **Descripción**
  - Crea un nuevo producto.
- **Parámetros de Cuerpo (JSON)**
  - `title` (string, requerido): El título del producto.
  - `description` (string, requerido): La descripción del producto.
  - `code` (string, requerido): El código único del producto.
  - `price` (number, requerido): El precio del producto.
  - `stock` (number, requerido): La cantidad de stock disponible.
  - `category` (string, opcional): La categoría del producto.
  - `thumbnails` (string, opcional): La URL de la imagen del producto.
- **Respuestas**
  - 201 Creado: El producto se creó satisfactoriamente.
  - 400 Solicitud Incorrecta: Error de validación en los datos del producto.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Actualizar un Producto Existente

- **URL**
  - `/api/productos/:id`
- **Método HTTP**
  - `PUT`
- **Descripción**
  - Actualiza un producto existente por su ID.
- **Parámetros de Ruta**
  - `id` (string): El ID único del producto.
- **Parámetros de Cuerpo (JSON)**
  - Igual que al crear un nuevo producto.
- **Respuestas**
  - 201 Creado: El producto se actualizó satisfactoriamente.
  - 400 Solicitud Incorrecta: Error de validación en los datos del producto o el producto no fue encontrado.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Eliminar un Producto

- **URL**
  - `/api/productos/:id`
- **Método HTTP**
  - `DELETE`
- **Descripción**
  - Elimina un producto por su ID.
- **Parámetros de Ruta**
  - `id` (string): El ID único del producto.
- **Respuestas**
  - 200 OK: El producto se eliminó satisfactoriamente.
  - 400 Solicitud Incorrecta: El producto con el ID especificado no fue encontrado.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---


## API de Carritos

### Descripción
Esta API proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar carritos de compra.

### Rutas Disponibles

---

### Obtener Todos los Carritos

- **URL**
  - `/api/carts`
- **Método HTTP**
  - `GET`
- **Descripción**
  - Obtiene una lista de todos los carritos de compra.
- **Respuestas**
  - 200 OK: La solicitud se completó satisfactoriamente y devuelve la lista de carritos.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Obtener un Carrito por ID

- **URL**
  - `/api/carts/:id`
- **Método HTTP**
  - `GET`
- **Descripción**
  - Obtiene un carrito de compra específico por su ID.
- **Parámetros de Ruta**
  - `id` (string): El ID único del carrito de compra.
- **Respuestas**
  - 200 OK: La solicitud se completó satisfactoriamente y devuelve el carrito de compra.
  - 400 Solicitud Incorrecta: El carrito con el ID especificado no fue encontrado.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Crear un Nuevo Carrito

- **URL**
  - `/api/carts`
- **Método HTTP**
  - `POST`
- **Descripción**
  - Crea un nuevo carrito de compra.
- **Parámetros de Cuerpo (JSON)**
  - `products` (array, requerido): Un array de objetos que representan los productos en el carrito.
    - `id` (string, requerido): El ID del producto.
    - `quantity` (number, requerido): La cantidad del producto en el carrito.
- **Respuestas**
  - 201 Creado: El carrito se creó satisfactoriamente.
  - 400 Solicitud Incorrecta: Error de validación en los datos del carrito.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

### Agregar un Producto al Carrito

- **URL**
  - `/api/carts/:cid/product/:pid`
- **Método HTTP**
  - `POST`
- **Descripción**
  - Agrega un producto al carrito especificado.
- **Parámetros de Ruta**
  - `cid` (string): El ID único del carrito de compra.
  - `pid` (string): El ID único del producto que se desea agregar al carrito.
- **Respuestas**
  - 201 Creado: El producto se agregó satisfactoriamente al carrito.
  - 400 Solicitud Incorrecta: El producto o el carrito con el ID especificado no fueron encontrados.
  - 500 Error Interno del Servidor: Ocurrió un error al procesar la solicitud.

---

Esta documentación describe las rutas disponibles en la API de carritos, los métodos HTTP admitidos, así como los parámetros esperados en cada solicitud. Puedes adaptarla según las necesidades específicas de tu aplicación.
