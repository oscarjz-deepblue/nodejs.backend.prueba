const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const esRoleValido = async (role = "USER_ROLE") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

//Validar si el email existe
const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} NO existe`);
  }
  //Si el usuario existe verifico su estado
  if (!existeUsuario.state) {
    throw new Error(`El usuario ${existeUsuario.name} está inactivo`);
  }
};

//validar categoria por id
const categoriaExiste = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id ${id} no existe en la BD`);
  }

  if (!existeCategoria.estado) {
    throw new Error(`La categoría ${existeCategoria.nombre} está inactiva`);
  }
};

//validar Producto por id
const productoExiste = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  categoriaExiste,
  productoExiste,
};
