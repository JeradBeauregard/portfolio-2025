import "./jim.css";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function JimPage() {
  return (
    <>
    
      <Header />
        
        <div className="decal decalZigzag" />
        <div className="decal decalBolt" />
        <div className="decal decalStripe" />
      <div className="jimBackgroundWrapper">
        {/* Decals */}
      

        <section className="jimCaseStudy">
          <h1 className="jimHeader">Jim</h1>
          <h2 className="jimSubHeader">The fitness app designed to lift with you.</h2>

          <div className="jimSection">
            <h3 className="jimTitle">I Needed More Than a Timer and a Notes App</h3>
            <p className="jimP">Too many tools. Not enough flow.</p>
            <p className="jimP">
              I built Jim because I was constantly juggling different tools at the gym — a Notes app for tracking, a separate timer for rest, and sometimes even a browser tab for reference. That constant context-switching broke my focus and made my workouts feel more chaotic than consistent.
            </p>
            <p className="jimP">
              What I needed was something smoother — a single tool to track my progress, automate rest timers, and keep me focused without pulling me out of flow.
            </p>
            <p className="jimP">But I quickly realized I wasn’t alone.</p>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">Jim Is for Lifters Who Want Simplicity, Flexibility, and Focus</h3>
            <p className="jimP">A tool that adapts to you — not the other way around.</p>
            <p className="jimP">
              Jim is built for anyone who wants to move with intention — from seasoned lifters to beginners just getting started. It’s designed to serve:
            </p>
            <ul className="jimList">
              <li>Everyday gym-goers who want a reliable, focused way to build and track their workouts</li>
              <li>Fitness communities that thrive on shared challenges and social motivation</li>
              <li>Personal trainers who need a streamlined way to assign and monitor client routines</li>
              <li>Anyone seeking an approachable, inclusive path to fitness</li>
            </ul>
            <p className="jimP">Jim makes exercise more accessible by offering:</p>
            <ul className="jimList">
              <li>Quick-start presets (Beginner, Intermediate, Advanced)</li>
              <li>Customizable difficulty and workout duration</li>
              <li>Clear time estimates so users always know what to expect</li>
            </ul>
            <p className="jimP">
              Whether you're training for strength, building consistency, or starting from scratch — Jim meets you where you are.
            </p>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">No One’s Centralized the Workout Experience — So I Did</h3>
            <p className="jimP">Jim brings everything into one focused flow.</p>
            <p className="jimP">Users are frustrated by:</p>
            <ul className="jimList">
              <li>Having to juggle multiple tools just to finish a workout</li>
              <li>Lack of customization — being forced into preset routines</li>
              <li>No rest timer integration</li>
              <li>Confusing, cluttered interfaces</li>
              <li>Uncertainty around how long a workout will take</li>
            </ul>
            <p className="jimP">
              For many, that leads to skipped workouts, lost motivation, or giving up altogether.
            </p>
            <p className="jimP">
              Jim is different. It’s clean, customizable, and designed to adapt to the user — not the other way around.
            </p>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">Jim Was Built with Intentional Design and Real-Life Research</h3>

            <h4 className="jimSubTitle">Step 1: I Started with Research</h4>
            <p className="jimP">
              I began by interviewing gym-goers and consulting directly with a trusted personal trainer to understand what lifters actually need from a fitness app. I also studied online communities, Reddit threads, and app reviews to identify recurring pain points and wish-list features.
            </p>
            <p className="jimP">
              The consensus: people want flexibility, clarity, and accountability — not another rigid, bloated tracker.
            </p>

            <h4 className="jimSubTitle">Step 2: I Formed a Clear Vision</h4>
            <ul className="jimList">
              <li>A routine builder with dynamic, editable fields for each exercise (sets, reps, weight, rest, etc.)</li>
              <li>A custom exercise creator to support any training style</li>
              <li>A clean, live workout mode with integrated rest timers and progress indicators</li>
              <li>Beginner, intermediate, and advanced presets for fast setup</li>
              <li>Routine time estimates to help users plan ahead</li>
              <li>Profile stat tracking to monitor progress</li>
              <li>A weekly routines tracker to support consistency and habit formation</li>
              <li>Community-driven features like routine sharing, trainer dashboards, and challenge events</li>
            </ul>

            <h4 className="jimSubTitle">Step 3: I Built the First Prototype Using PHP</h4>
            <p className="jimP">I built the MVP using PHP, MySQL, and TailwindCSS, with a focus on usability and logic structure:</p>
            <ul className="jimList">
              <li>Users can create and save custom routines with personalized exercises</li>
              <li>Exercises dynamically display relevant input fields based on their type</li>
              <li>Sessions are persistent, mobile-friendly, and fully editable</li>
              <li>The UI emphasizes simplicity, flow, and clarity</li>
            </ul>
            <p className="jimP">This validated the feature architecture and gave me a solid foundation to expand from.</p>

            <h4 className="jimSubTitle">Step 4: I Shared the Prototype and Planned the Next Phase</h4>
            <p className="jimP">
              While the prototype hasn’t been formally tested, I’ve shared it with peers and a certified personal trainer. The response has been enthusiastic — especially around:
            </p>
            <ul className="jimList">
              <li>The custom exercise builder</li>
              <li>Built-in timers and workout flow</li>
              <li>Fitness level presets</li>
              <li>The potential for stat tracking and community-based features</li>
            </ul>
            <p className="jimP">This feedback is directly influencing the next build phase.</p>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">I’m Rebuilding Jim to Scale with the MERN Stack</h3>
            <p className="jimP">
              Jim is now being rebuilt in the MERN stack (MongoDB, Express, React, Node.js) for scalability, flexibility, and a mobile-first experience.
            </p>

            <h4 className="jimSubTitle">In Progress:</h4>
            <ul className="jimList">
              <li>Live workout mode with visual progress feedback and timers</li>
              <li>Quick-start presets and fully customizable routines</li>
              <li>Routine libraries, social sharing, and saved plans</li>
              <li>Trainer dashboards for client workout assignment and tracking</li>
              <li>Weekly routine planning with consistency insights</li>
              <li>Stat tracking by exercise, volume, frequency, and PRs</li>
              <li>User accounts with saved progress and graphs</li>
              <li>Fully responsive design — with a mobile app version in development via React Native</li>
            </ul>

            <p className="jimP"><strong>Goal:</strong> Beta launch of the mobile app by January 2026</p>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">Jim’s MVP Was Designed to Stay Focused — and Powerful</h3>
            <p className="jimP">Everything you need, nothing you don’t.</p>
            <ul className="jimList">
              <li>Custom Exercise Builder</li>
              <li>Routine Builder</li>
              <li>Routine Search & Explore</li>
              <li>Public and Private Routine Sharing</li>
              <li>Progressive Overload Engine</li>
              <li>Weekly Routine Tracking</li>
              <li>Live Workout Mode with Rest Timers</li>
              <li>Stat Tracking & Routine History</li>
            </ul>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">The Results So Far</h3>
            <p className="jimP">Jim is more than a prototype — it's a validated foundation.</p>
            <ul className="jimList">
              <li>Built a functional prototype that proves out core functionality</li>
              <li>Developed a scalable feature set for beginners, advanced users, and trainers</li>
              <li>Created a strong design and architecture foundation for future expansion</li>
            </ul>
          </div>

          <div className="jimSection">
            <h3 className="jimTitle">What Building Jim Taught Me</h3>
            <p className="jimP">From frustration to clarity — with vision all the way through.</p>
            <ul className="jimList">
              <li>
                <strong>#1: Customization drives consistency</strong><br />
                People are more likely to stick with workouts when the tool adapts to them — not the other way around.
              </li>
              <li>
                <strong>#2: Simplicity is a superpower</strong><br />
                A clean, focused experience makes the difference between feeling overwhelmed and getting it done.
              </li>
              <li>
                <strong>#3: Build with vision</strong><br />
                Jim isn’t just a project — it’s becoming a full-featured product designed to empower users and build healthier habits.
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
