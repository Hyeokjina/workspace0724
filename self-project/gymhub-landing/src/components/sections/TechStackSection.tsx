'use client';

const techStack = [
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'cyan',
    techs: [
      { name: 'Java', version: '17' },
      { name: 'Spring Boot', version: '3.5.7' },
      { name: 'MyBatis', version: '3.0.5' },
      { name: 'Spring Security', version: '3.5.6' }
    ]
  },
  {
    category: 'Frontend',
    icon: '🎨',
    color: 'purple',
    techs: [
      { name: 'HTML5', version: '-' },
      { name: 'CSS3', version: '-' },
      { name: 'JavaScript', version: 'ES5' },
      { name: 'JSP', version: '2.3' }
    ]
  },
  {
    category: 'Database',
    icon: '💾',
    color: 'pink',
    techs: [
      { name: 'Oracle DB', version: '11g+' }
    ]
  },
  {
    category: 'DevOps',
    icon: '🚀',
    color: 'cyan',
    techs: [
      { name: 'Tomcat', version: '10.x' },
      { name: 'Maven', version: '3.6+' },
      { name: 'IntelliJ IDEA', version: '-' },
      { name: 'Git', version: '-' }
    ]
  }
];

const architecture = [
  { layer: 'Presentation', tech: 'JSP, JSTL, JS, CSS', color: 'cyan' },
  { layer: 'Controller', tech: 'Spring MVC', color: 'purple' },
  { layer: 'Service', tech: 'Business Logic', color: 'pink' },
  { layer: 'Data Access', tech: 'MyBatis Mapper', color: 'cyan' },
  { layer: 'Database', tech: 'Oracle Database', color: 'purple' }
];

const colorMap = {
  cyan: {
    border: 'border-cyan-500/50 group-hover:border-cyan-400',
    bg: 'from-cyan-500/20 to-cyan-900/20',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/50'
  },
  purple: {
    border: 'border-purple-500/50 group-hover:border-purple-400',
    bg: 'from-purple-500/20 to-purple-900/20',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/50'
  },
  pink: {
    border: 'border-pink-500/50 group-hover:border-pink-400',
    bg: 'from-pink-500/20 to-pink-900/20',
    text: 'text-pink-400',
    glow: 'shadow-pink-500/50'
  }
};

export function TechStackSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 backdrop-blur-sm">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Tech Stack</span>
            </div>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
              검증된 기술 스택
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            안정적이고 확장 가능한 엔터프라이즈급 아키텍처
          </p>
        </div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {techStack.map((stack, i) => {
            const colors = colorMap[stack.color as keyof typeof colorMap];
            return (
              <div key={i} className="group relative">
                <div className={`relative p-6 bg-gradient-to-br ${colors.bg} ${colors.border} border-2 backdrop-blur-sm transition-all duration-300 card-3d`}>
                  <div className="text-5xl mb-4">{stack.icon}</div>
                  <h3 className={`font-['Bebas_Neue'] text-2xl ${colors.text} mb-4 tracking-wider`}>
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.techs.map((tech, j) => (
                      <div key={j} className="flex items-center justify-between text-sm">
                        <span className="text-white font-medium">{tech.name}</span>
                        <span className="text-gray-500">{tech.version}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-['Bebas_Neue'] text-4xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            시스템 아키텍처
          </h3>

          <div className="space-y-4">
            {architecture.map((layer, i) => {
              const colors = colorMap[layer.color as keyof typeof colorMap];
              return (
                <div key={i} className="group">
                  <div className={`relative p-6 bg-gradient-to-r ${colors.bg} ${colors.border} border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-['Bebas_Neue'] text-2xl ${colors.text} tracking-wider`}>
                          {layer.layer}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{layer.tech}</div>
                      </div>
                      {i < architecture.length - 1 && (
                        <div className="text-3xl text-gray-600">↓</div>
                      )}
                    </div>

                    {/* Pulse indicator */}
                    <div className={`absolute right-4 top-4 w-3 h-3 ${colors.bg} rounded-full pulse-glow`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
