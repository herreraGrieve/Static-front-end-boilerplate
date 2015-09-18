var input_Directory = 'development/',
    output_Directory = 'production/';

module.exports = {
	sass : {
	  src: input_Directory + 'styles',
	  dest: output_Directory + 'css',
	  sassConfigProd: {
	  	require: ['susy','breakpoint'],
	  	style: 'compressed'
	  },
	  sassConfigDev: {
	  	require: ['susy','breakpoint'],
	  	style: 'expanded'
	  }
	},
	jade : {
		src: ['development/templates/pages/*.jade','!development/templates/**/_*.jade'],
		dest: output_Directory,
		jadeConfigProd: {
			pretty: false
		},
		jadeConfigDev: {
			pretty: true
		}
	}
}