import mongoose from "mongoose";

//definimos constantes del schema
const MIN_LENGTH = 3;
const MAX_LENGTH = 100;
const MIN_DESC_LENGTH = 5;
const MAX_DESC_LENGTH = 500;

//definimos el esquema
const taskSchema = new mongoose.Schema({
    //TITULO DE LA TAREA
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [MIN_LENGTH, `El título debe tener al menos ${MIN_LENGTH} caracteres`],
        maxlength: [MAX_LENGTH, `El título no debe exceder los ${MAX_LENGTH} caracteres`]
      },
      //DESCRIPCION DE LA TAREA
      descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        minlength: [MIN_DESC_LENGTH, `La descripción debe tener al menos ${MIN_DESC_LENGTH} caracteres`],
        maxlength: [MAX_DESC_LENGTH, `La descripción no debe exceder los ${MAX_DESC_LENGTH} caracteres`]
      },
      //ESTADO DE LA TAREA COMPLETADO O NO
      completado: {
        type: Boolean,
        default: false
      },
      //FECHA DE VENCIMIENTO DE LA TAREA
      fechaVencimiento: {
        type: Date,
        required: false,
        validate: {
          validator: function(value) {
            return value > Date.now();  
          },
          message: 'La fecha de vencimiento debe ser en el futuro.'
        }
      },
      
      // Prioridad de la tarea (opcional)
      prioridad: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        default: 'media'
      },
      //relacion con el usuario
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    {
      timestamps: true
    }
);

//creamos el modelo
export const Task = mongoose.model('task', taskSchema);

