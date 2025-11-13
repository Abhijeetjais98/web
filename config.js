import { FaDiscord, FaGithub, FaMapPin, FaLinkedin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase } from "react-icons/hi";

export const config = {
    developer: {
        name: "Abhijeet",
    },
    social: {
        github: "Abhijeetjais98",
        discord: "https://discordapp.com/users/1434161237037547591"
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: true, // Enable/disable Spotify recent tracks
    projects: [
        {
            id: 1,
            title: "Tour & Travel Website",
            description: "A responsive tour and travel website where users can explore destinations, view packages, and plan their trips easily.",
            image: "/projects/project-1.webp",
            technologies: ["HTML", "CSS", "Javascript", "PHP",],
            github: "#",
            demo: "https://tour-travels-three.vercel.app/"
        },
        {
            id: 2,
            title: "Sorting Algorithm Visualizer",
            description: "A sorting visualizer that demonstrates algorithm behavior through real-time animations. Users can choose different sorting algorithms, adjust speed, and visualize the sorting process step-by-step.",
            image: "/projects/project-2.webp",
            technologies: ["HTML", "CSS", "JAVASCRIPT"],
            github: "#",
            demo: "https://sortingvisualizer-wine.vercel.app/"
        },
        {
            id: 3,
            title: "Netflix Frontend Clone",
            description: "A fully responsive Netflix frontend clone showcasing movie rows, banners, and an intuitive user interface.",
            image: "/projects/project-3.webp",
            technologies: ["HTML", "CSS"],
            github: "#",
            demo: "https://netflix-ds2l.vercel.app/"
        }
    ],
     skills: [
        {
            title: "Cloud Services",
            icon: <HiCode />,
            description: "Cloud hosting, containers, and simple infrastructure management.",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "AWS", level: "begginer", hot: true },
                { name: "CI/CD basics", level: "begginer" },
                { name: "VM", level: "begginer" },
                { name: "Cloud deployment", level: "begginer" },
                { name: "Docker", level: "begginer" }
            ]
        },
        {
            title: "Backend",
            icon: <HiDatabase />,
            description: "Server & Database",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Golang", level: "Intermediate", hot: true },
                { name: "Docker", level: "Intermediate" },
                { name: "Github", level: "Intermediate", hot: true }
            ]
        },
        {
            title: "Programs & Tools",
            icon: <HiCube />,
            description: "Development & Productivity Tools",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "VS Code", level: "Expert", hot: true },
                { name: "Linux", level: "Begginer", hot: true },
                { name: "Photoshop", level: "Expert" },
                { name: "Git", level: "Intermediate" }
            ]
        }
    ],
     experiences: [
        {
            position: "Frontend Developer",
            company: "SelectSkillSet",
            period: "2024 - Present",
            location: "Remote",
            description: "Developing modern, responsive frontend applications with focus on user experience and performance. Working with cutting-edge technologies to build scalable web solutions.",
            responsibilities: [
                "Building responsive and interactive user interfaces using HTML , CSS and JavaScript",
                "Implementing modern UI/UX designs with TailwindCSS",
                "Optimizing application performance and ensuring cross-browser compatibility",
                "Collaborating with design and backend teams to deliver high-quality features"
            ],
            technologies: ["HTML", "CSS", "TailwindCSS", "JavaScript",]
        },
        {
            position: "Cloud Engineer",
            company: "SelectSkillSet",
            period: "2024-present",
            location: "Remote",
            description: "Developed and maintained Cloud Projects, working with Golang and docker. Collaborated with cross-functional teams to deliver robust software solutions.",
            responsibilities: [
                "Created simple backend services in Go and connected them with basic APIs",
                "Built and ran applications in Docker containers, learning how to package and test code consistently across different environments.",
                "Deployed small projects to the cloud (like AWS/GCP/Azure) and practiced setting up servers, storage, and networking.",
                "Monitored and troubleshooted cloud apps, fixing basic issues with logs, containers, and resource usage."
            ],
            technologies: ["AWS", "Docker", "Azure", "Golang", "Kubernetes"]
        }
    ],
    contactInfo: [
     
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@Abhijeetjais98",
            link: `https://github.com/Abhijeetjais98`
        },
        {
            icon: <FaLinkedin className="w-5 h-5" />,
            label: "Linkdin",
            value: "Abhijeet Kumar",
            link: `https://www.linkedin.com/in/abhijeetjais13/`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "sastamemepubg@gmail.com",
            link: "mailto:sastamemepubg@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "India",
            link: null
        }
    ]
}