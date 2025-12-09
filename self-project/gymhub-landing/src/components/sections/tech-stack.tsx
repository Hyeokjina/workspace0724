import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Server, Boxes } from "lucide-react";

const techCategories = [
  {
    icon: Code,
    title: "Backend",
    color: "blue",
    technologies: [
      { name: "Java", version: "17" },
      { name: "Spring Boot", version: "3.5.7" },
      { name: "MyBatis", version: "3.0.5" },
      { name: "Spring Security", version: "3.5.6" },
    ],
  },
  {
    icon: Boxes,
    title: "Frontend",
    color: "purple",
    technologies: [
      { name: "HTML5", version: "-" },
      { name: "CSS3", version: "-" },
      { name: "JavaScript", version: "ES5" },
      { name: "JSP", version: "2.3" },
    ],
  },
  {
    icon: Database,
    title: "Database",
    color: "green",
    technologies: [
      { name: "Oracle Database", version: "11g+" },
    ],
  },
  {
    icon: Server,
    title: "Server & Tools",
    color: "orange",
    technologies: [
      { name: "Apache Tomcat", version: "10.x" },
      { name: "Maven", version: "3.6+" },
      { name: "IntelliJ IDEA", version: "-" },
      { name: "Git", version: "-" },
    ],
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-500",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-500",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-500",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-500",
  },
};

export function TechStack() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            검증된 기술 스택
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            안정적이고 확장 가능한 엔터프라이즈급 기술로 구축되었습니다
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            return (
              <Card key={index} className={`border-2 hover:${colors.border} transition-colors`}>
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg}`}>
                    <category.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <CardTitle className="mt-4">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-900">{tech.name}</span>
                        <span className="text-gray-500">{tech.version}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Architecture */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="text-center text-2xl font-bold text-gray-900">시스템 아키텍처</h3>
          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 text-center">
                <p className="font-semibold text-blue-900">Presentation Layer</p>
                <p className="text-sm text-blue-700">JSP, JSTL, JavaScript, CSS</p>
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 text-center">
                <p className="font-semibold text-purple-900">Controller Layer</p>
                <p className="text-sm text-purple-700">Spring MVC Controllers</p>
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 text-center">
                <p className="font-semibold text-green-900">Service Layer</p>
                <p className="text-sm text-green-700">Business Logic, Service Interfaces</p>
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4 text-center">
                <p className="font-semibold text-orange-900">Data Access Layer</p>
                <p className="text-sm text-orange-700">MyBatis Mapper, Mapper XML</p>
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
              </div>
              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-center">
                <p className="font-semibold text-red-900">Database Layer</p>
                <p className="text-sm text-red-700">Oracle Database</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
