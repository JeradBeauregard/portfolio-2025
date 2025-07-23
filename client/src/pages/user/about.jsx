import Header from "../../components/header";
import Footer from "../../components/footer";
import "./about.css";

export default function AboutPage(){
return(
<>
    <Header />
    <main id="aboutMain">
        <h1 className="aboutH1">About Me</h1>
        <p className="aboutP">Hi, I’m Jerad — a developer, designer, and lifelong creative with a passion for building thoughtful, empowering digital experiences.
Before I ever wrote a line of code, I was immersed in the world of fine art. I studied painting and visual storytelling in university, where I learned to observe deeply, solve problems creatively, and follow the thread of an idea all the way to its full expression. That foundation still guides the way I work.
Today, I bring that same intentionality into my development practice. Whether I’m designing interfaces or building full-stack web applications, I care about clarity, usability, and meaning — creating tools that don’t just work well, but feel right to use.</p>
        <h2>Creativity as a Constant</h2>
        <p className="aboutP">Art has been a part of my life for as long as I can remember. From sketchbooks and canvases to digital illustrations, creativity has always been my way of understanding the world and expressing ideas.
That love for creation now lives in my development work. I approach apps and websites the way I once approached a painting: with curiosity, empathy, and an eye for detail. It’s not just about writing code — it’s about crafting experiences that feel cohesive, intentional, and alive.
Developing an app is a creative process. Structuring a database is like establishing the foundation of a complex design — it requires clarity, foresight, and balance. Building a user interface is about rhythm and space — how elements relate to one another, how they guide the user’s attention, how they make someone feel.
Every data model, every component, every route contributes to a larger composition. Designing a schema reminds me of shaping the structure in figure drawing — understanding the relationships beneath the surface to create something fluid and expressive. Even naming variables can feel like selecting a color palette: it needs to be intentional, clear, and subtly evocative. Debugging becomes its own kind of art — knowing when to refine, when to rework, and when to step back.
When I build, I constantly shift between the analytical and the artistic. I imagine how a user will flow through the experience — what they’ll see, how they’ll interact, and what they’ll need at each step — and then I structure the logic to support that vision. I often begin with sketches, diagrams, or mind maps to explore and clarify before I touch a single line of code. I write as if I’m composing — letting structure, rhythm, and clarity guide the form.
Creativity isn’t something I turn off when I open my code editor. It’s the lens I bring to every part of the process — from architecture to experience — and it’s what allows me to build work that feels human, functional, and alive.
</p>
        <h2 className="aboutH2">My Interests Outside of Tech</h2>
        <p className="aboutP">Outside of development, I spend a lot of time focused on personal well-being and growth.
You’ll often find me at the gym, where I’m passionate about strength training and nutrition. I love the structure and discipline of training — the way it challenges me physically while sharpening my focus and resilience. It’s also what inspired me to start building Jim, my gym routine tracking app.
Art is still a huge part of my life. I sketch, paint, and create digital illustrations whenever I can. Even though my tools have changed, I still crave that creative flow — the space where intuition takes over and ideas take shape.
I also have a daily mindfulness practice. Meditation and journaling help me slow down, reflect, and stay intentional. They keep me grounded — especially when I’m deep in a project and need clarity or perspective.
I’m always reading and learning — usually about design, psychology, spirituality, or systems thinking. I love discovering patterns and connections across disciplines, then applying that insight to my work.
And I care deeply about connection. Whether it’s showing up for my local community, sharing ideas with peers, or simply having meaningful one-on-one conversations, I value spaces where people can be honest, curious, and open.
These parts of my life aren’t separate from my work — they feed into it. They shape how I think, how I solve problems, and how I show up in everything I build.
</p>
    </main>

    <Footer />
</>
)

}
