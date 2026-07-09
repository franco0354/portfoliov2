import Messenger from '@/app/assets/img/messanger.png'
import TodoList from '@/app/assets/img/todolist.png'
import Weather from '@/app/assets/img/weather.png'
import Scanner from '@/app/assets/img/Scanner.jpg'
import PinoyCode from '@/app/assets/img/PinoyCodex.png'
export const ProjectData = [
    {
        projectURL: PinoyCode,
        title: "Pinoy Codex",
        description: "A beginner-friendly platform for learning the fundamentals of coding and programming. Built to help newcomers take their first steps into software development with clear lessons and practical examples.",
        icon: ["Next Js", "Supabase", "Tailwind"],
        id: 1,
        link: "https://pinoycodex.vercel.app/",
        github: "#"
    }, {
        projectURL: Messenger,
        title: "Messenger App",
        description: "Stay connected with the people who matter through real-time messaging. Whether you're chatting with family or friends, enjoy a fast, secure, and user-friendly experience designed for meaningful conversations—anytime, anywhere.",
        icon: ["shadcn", "Tailwind", "Next Js", "Firebase"],
        id: 2,
        link: "https://new-messenger-app-4yo8.vercel.app/",
        github: "https://github.com/akatsuki0354/practice_app_messenger"
    }, {
        projectURL: TodoList,
        title: "Todo List",
        description: "Organize your day with ease. This todo app helps you track daily tasks, set priorities, and stay productive—all in one simple, intuitive interface built for clarity and focus.",
        icon: ["shadcn", "Tailwind", "Next Js", "Firebase"],
        id: 3,
        link: "https://todo-app2-bice.vercel.app/",
        github: "https://github.com/akatsuki0354/todo-app2"
    },
    {
        projectURL: Weather,
        title: "Weather",
        description: "Get real-time weather updates by searching any location. Stay informed with accurate forecasts, temperature readings, and current conditions—wherever you are in the world.",
        icon: ["Tailwind", "Next Js", "Firebase"],
        id: 4,
        link: "https://franco-weather.vercel.app/",
        github: "https://github.com/akatsuki0354/weather"
    }, {
        projectURL: Scanner,
        title: "Scanner Mobile",
        description: "A lightweight, fast QR code scanner built for mobile. Scan and decode QR codes effortlessly on the go—ideal for everyday tasks, events, and quick access to links or information.",
        icon: ["Firebase"],
        id: 5,
        link: "#",
        github: "#"
    },

]
export type ProjectLayoutsProps = {
    photoURl: string;
    photoAlt: string;
    title: string;
    link: string;
    description: string;
    icon: string[];
    github: string | undefined;
}