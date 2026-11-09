
// =================================
// PATHFINDER - MAIN JAVASCRIPT
// =================================

// Store user selections
let selectedYear = "";
let selectedBranch = "";
let selectedDirection = "";

// Current screen
let currentStep = "year";

// Popup element
const popup = document.getElementById("popup");

// Engineering years
const years = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
    "Not yet in engineering",
    "Engineering completed"
];

// Technical branches
const branches = [
    {
        name: "Computer Science Engineering (CSE)",
        icon: "💻",
        description: "Programming and software development"
    },
    {
        name: "Information Technology (IT)",
        icon: "🌐",
        description: "Networks and information technology"
    },
    {
        name: "Artificial Intelligence and Machine Learning (AI/ML)",
        icon: "🤖",
        description: "AI and intelligent systems"
    },
    {
        name: "Computer Science - Data Science",
        icon: "📊",
        description: "Data analysis and machine learning"
    }
];

// Start the website
renderYear();

// =================================
// STEP 1 - SELECT ENGINEERING YEAR
// =================================

function renderYear() {

    currentStep = "year";

    popup.innerHTML = `
        <div class="step-label">
            <span>STEP 1 OF 3</span>
            <span>Education</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: 33%"></div>
        </div>

        <h2>Where are you right now?</h2>

        <p class="subtitle">
            Select your current engineering education stage.
        </p>

        <div class="options">

            ${years.map((year, index) => `
                <button class="option-card"
                    data-year="${year}">

                    <span class="option-number">
                        ${index < 4 ? "0" + (index + 1) : "★"}
                    </span>

                    <h3>${year}</h3>

                    <p>
                        ${index < 4
                            ? "Engineering"
                            : "Choose your learning path"}
                    </p>

                </button>
            `).join("")}

        </div>

        <div class="button-row">
            <button class="btn btn-primary"
                id="continueYear" disabled>
                Continue →
            </button>
        </div>
    `;

    // Select a year
    document.querySelectorAll("[data-year]").forEach(card => {

        card.addEventListener("click", () => {

            selectedYear = card.dataset.year;

            document.querySelectorAll("[data-year]")
                .forEach(item => item.classList.remove("selected"));

            card.classList.add("selected");

            document.getElementById("continueYear").disabled = false;

        });

    });

    // Continue button
    document.getElementById("continueYear")
        .addEventListener("click", () => {

            if (!selectedYear) return;

            // These users go directly to custom guide setup
            if (
                selectedYear === "Not yet in engineering" ||
                selectedYear === "Engineering completed"
            ) {
                renderCustomGuide();
            } else {
                renderBranch();
            }

        });
}

// =================================
// STEP 2 - SELECT ENGINEERING BRANCH
// =================================

function renderBranch() {

    currentStep = "branch";

    popup.innerHTML = `
        <div class="step-label">
            <span>STEP 2 OF 3</span>
            <span>Engineering Branch</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: 66%"></div>
        </div>

        <h2>Which branch are you studying?</h2>

        <p class="subtitle">
            Choose your engineering specialization.
        </p>

        <div>
            ${branches.map(branch => `
                <button class="branch-card"
                    data-branch="${branch.name}">

                    <div class="branch-icon">
                        ${branch.icon}
                    </div>

                    <div class="branch-info">
                        <h3>${branch.name}</h3>
                        <p>${branch.description}</p>
                    </div>

                </button>
            `).join("")}
        </div>

        <div class="button-row">

            <button class="btn btn-secondary"
                id="backYear">
                ← Back
            </button>

            <button class="btn btn-primary"
                id="continueBranch" disabled>
                Continue →
            </button>

        </div>
    `;

    // Select branch
    document.querySelectorAll("[data-branch]")
        .forEach(card => {

            card.addEventListener("click", () => {

                selectedBranch = card.dataset.branch;

                document.querySelectorAll("[data-branch]")
                    .forEach(item =>
                        item.classList.remove("selected")
                    );

                card.classList.add("selected");

                document.getElementById("continueBranch")
                    .disabled = false;

            });

        });

    // Back button
    document.getElementById("backYear")
        .addEventListener("click", renderYear);

    // Continue button
    document.getElementById("continueBranch")
        .addEventListener("click", () => {

            if (!selectedBranch) return;

            renderDirection();

        });
}

// =================================
// STEP 3 - SELECT LEARNING DIRECTION
// =================================

function renderDirection() {

    currentStep = "direction";

    popup.innerHTML = `
        <div class="step-label">
            <span>STEP 3 OF 3</span>
            <span>Learning Direction</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: 100%"></div>
        </div>

        <h2>How would you like to proceed?</h2>

        <p class="subtitle">
            Choose how you want us to build your learning journey.
        </p>

        <div class="direction-card" data-direction="custom">

            <h3>🎯 Personalised path</h3>

            <p>
               The basics of your course + your personalized interest
            </p>

        </div>

        <div class="direction-card" data-direction="basic">

            <h3>📚 Continue with the basics</h3>

            <p>
                Guide me through the essential technical
                subjects and skills of my selected branch.
            </p>

        </div>

        <div class="button-row">

            <button class="btn btn-secondary"
                id="backBranch">
                ← Back
            </button>

            <button class="btn btn-primary"
                id="continueDirection" disabled>
                Continue →
            </button>

        </div>
    `;

    // Select learning direction
    document.querySelectorAll("[data-direction]")
        .forEach(card => {

            card.addEventListener("click", () => {

                selectedDirection = card.dataset.direction;

                document.querySelectorAll("[data-direction]")
                    .forEach(item =>
                        item.classList.remove("selected")
                    );

                card.classList.add("selected");

                document.getElementById("continueDirection")
                    .disabled = false;

            });

        });

    // Back button
    document.getElementById("backBranch")
        .addEventListener("click", renderBranch);

    // Continue button
    document.getElementById("continueDirection")
        .addEventListener("click", () => {

            if (selectedDirection === "custom") {
                renderCustomGuide();
            } else {
                renderBasicGuide();
            }

        });
}

// =================================
// CUSTOMIZED GUIDE SETUP
// =================================

function renderCustomGuide() {

    currentStep = "custom";

    popup.innerHTML = `
        <div class="step-label">
            <span>PERSONALIZED GUIDE</span>
            <span>Custom Setup</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: 100%"></div>
        </div>

        <h2>Let's build your personal guide!</h2>

        <p class="subtitle">
            Tell us what you want to achieve.
            We'll create a roadmap based on your goals.
        </p>

        <label for="careerGoal">What is your career goal?</label>

        <input
            type="text"
            id="careerGoal"
            class="input-field"
            placeholder="Example: Software Engineer"
        >

        <label for="knowledgeLevel">
            What is your current knowledge level?
        </label>

        <select id="knowledgeLevel" class="input-field">
            <option value="">Select your level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>

        <div class="button-row">

            <button class="btn btn-secondary"
                id="backCustom">
                ← Back
            </button>

            <button class="btn btn-primary"
                id="createGuide">
                Create My Guide →
            </button>

        </div>
    `;

    document.getElementById("backCustom")
        .addEventListener("click", () => {

            if (selectedYear === "Not yet in engineering" ||
                selectedYear === "Engineering completed") {
                renderYear();
            } else {
                renderDirection();
            }

        });

    document.getElementById("createGuide")
        .addEventListener("click", () => {

            const goal = document.getElementById("careerGoal")
                .value.trim();

            const level = document.getElementById("knowledgeLevel")
                .value;

            if (!goal || !level) {
                alert("Please enter your career goal and knowledge level.");
                return;
            }

            renderResult(goal, level);

        });
}

// =================================
// BASIC LEARNING GUIDE
// =================================

function renderBasicGuide() {

    currentStep = "result";

    renderResult(
        "Standard Branch Roadmap",
        "Recommended learning path"
    );

}

// =================================
// FINAL RESULT
// =================================

function renderResult(goal, level) {

    currentStep = "result";

    popup.innerHTML = `
        <div class="step-label">
            <span>YOUR PROFILE</span>
            <span>Completed</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: 100%"></div>
        </div>

        <h2>You're all set! 🎉</h2>

        <p class="subtitle">
            Your onboarding is complete.
            Here is your selected learning direction.
        </p>

        <div class="result-box">

            <h3>YOUR EDUCATION</h3>

            <p>
                <strong>Year:</strong>
                ${selectedYear || "Not selected"}
            </p>

            <p>
                <strong>Branch:</strong>
                ${selectedBranch || "To be determined"}
            </p>

            <hr style="border-color: #465472; margin: 15px 0;">

            <h3>YOUR LEARNING GOAL</h3>

            <p>
                <strong>Goal:</strong>
                <span id="goalText"></span>
            </p>

            <p>
                <strong>Level:</strong>
                <span id="levelText"></span>
            </p>

        </div>

        <div class="button-row">

            <button class="btn btn-primary" id="finish">
                Explore My Journey →
            </button>

        </div>
    `;

    // Safely display user-entered text
    document.getElementById("goalText").textContent = goal;
    document.getElementById("levelText").textContent = level;

    document.getElementById("finish")
        .addEventListener("click", () => {

            popup.innerHTML = `
                <h2>Welcome to Pathfinder! 🚀</h2>

                <p class="subtitle">
                    Your onboarding is complete.
                    Your learning journey starts here.
                </p>

                <div class="result-box">
                    <h3>Coming Next</h3>
                    <p>
                        Your personalized roadmap,
                        learning tasks and progress dashboard
                        will appear here.
                    </p>
                </div>
            `;

        });

}
