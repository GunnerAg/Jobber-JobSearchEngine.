const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    /*Define schema here */
    nameEmployee: {
      type: String, 
      required: true
    },
    secondnameEmployee: {
      type: String, 
      required: true
    },
    age: {
      type: Number, 
      required: true
    },
    adressEmployee: {
      type: String,
    },
    emailEmployee: {
      type: String,
      required: true,
      unique: true, 
    },
    passwordHashEmployee: {
      type: String, 
      required: true
    },
    biography:{
      type:String,
    },
    keywords:[{
      type:String,
      enum:['MySQL','Python','C++','C#','Java','Node.js','Ruby','Ruby on Rails','OpenCS','MaríaDB','Symfony','OpenCV','PHP','MongoDB','Django','React','AngularJS','HTML','CSS','Vue.js','JavaScript','TypeScript','Bootstrap','jQuerry','SASS','Ansible','Docker','Bash','Linux Kernel','Git','Debian','AWS','Azure','Kubernetes','Grafana','Apache Spark','Python','Google Analytics','Hadoop','Kibana','R','TensorFlow']
    }]
  },
  {
    timestamps: true
  }
);
let employeeModel = model('Employee', employeeSchema);
 module.exports = employeeModel