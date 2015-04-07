{
	"targets" :[
		{
			"target_name": "addon",
			"sources": ["addon.cpp", "MyObject.cpp"],
			'conditions': [
				['OS=="linux"', {
					'cflags!': ['-fno-exceptions'],
					'cflags_cc!': ['-fno-exceptions'],
				}],
				['OS=="mac"', {
					'xcode_settings': {
						'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
						'OTHER_CPLUSPUSFLAGS': ['-std=c++11','-stdlib=libc++'],
					},
					'cflags': [],
					'include_dirs': ['/usr/include/malloc']
				}],
				['OS=="win"', {
					'configurations': {
						'Release': {
							'msvs_settings': {
								'VCCLCompilerTool': {
									'ExceptionHandling': 1
								}
							}
						}
					}
				}]
			]
		}
	]
}
