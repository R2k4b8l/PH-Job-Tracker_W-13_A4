let interviewList = [];
let rejectedList = [];
let currentFilter = "all";

const totalJobsElement = document.querySelectorAll(".jobCount");
const selectedJobCountElement = document.getElementById("selectedJobCount");
const selectedJobText = document.getElementById("selectedJobText");
const interviewJobsElement = document.getElementById("interviewJobs");
const rejectedJobsElement = document.getElementById("rejectedJobs");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardsContainer = document.getElementById("allCardsContainer");
const mainContainer = document.querySelector("main");
const filteredJobsSection = document.getElementById("filteredJobsSection");


function updateJobCounters() {

    const totalJobs = allCardsContainer.children.length;

    // Header total count
    totalJobsElement.forEach(element => {
        element.textContent = totalJobs;
    });

    interviewJobsElement.textContent = interviewList.length;
    rejectedJobsElement.textContent = rejectedList.length;

    // Selected job text update
    if (currentFilter === "all") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${totalJobs}</span> jobs`;
    }
    else if (currentFilter === "interview") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${interviewList.length}</span> of ${totalJobs} jobs`;
    }
    else if (currentFilter === "rejected") {
        selectedJobText.innerHTML =
            `<span class="font-bold">${rejectedList.length}</span> of ${totalJobs} jobs`;
    }
}

updateJobCounters();


//Active button toggle functionality and show/hide sections based on active button
function toggleActiveButton(activeButton) {
    const filterButtons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];

    filterButtons.forEach(button => {
        // all active class remove
        button.classList.remove("bg-blue-500");

        // all default class add
        button.classList.add("bg-gray-500");
    });

    // add class for active button
    activeButton.classList.remove("bg-gray-500");
    activeButton.classList.add("bg-blue-500");

    // Show/hide sections based on active button
    if (activeButton.id == 'interview-filter-btn') {
        allCardsContainer.classList.add('hidden');
        filteredJobsSection.classList.remove('hidden');
        createInterviewJobCard();
        currentFilter = "interview";
        updateJobCounters();
    } else if (activeButton.id == 'all-filter-btn') {
        allCardsContainer.classList.remove('hidden');
        filteredJobsSection.classList.add('hidden');
        currentFilter = "all";
        updateJobCounters();
    } else if (activeButton.id == 'rejected-filter-btn') {
        allCardsContainer.classList.add('hidden');
        filteredJobsSection.classList.remove('hidden');
        createRejectedJobCard();
        currentFilter = "rejected";
        updateJobCounters();
    }
}

// Event listener for main section to handle interview and reject button clicks
mainContainer.addEventListener("click", function (event) {
    // Check if the clicked element is an interview or reject button
    if (event.target.classList.contains("interview-btn")) {
        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;
        const salary = card.querySelector(".salary").textContent;
        const status = card.querySelector(".status").textContent;
        const details = card.querySelector(".details").textContent;

        card.querySelector(".status").textContent = "INTERVIEW";

        // after updating filtered card
        const originalCard = Array.from(allCardsContainer.children).find(c =>
            c.querySelector(".company-name").textContent === companyName &&
            c.querySelector(".designation").textContent === designation
        );
        if (originalCard) {
            originalCard.querySelector(".status").textContent = "INTERVIEW";
        }

        const cardInfo = {
            companyName,
            designation,
            salary,
            status: "INTERVIEW",
            details
        };
        const interviewExists = interviewList.find(card => card.companyName === companyName && card.designation === designation);
        if (!interviewExists) {
            interviewList.push(cardInfo);
        }

        //remove from rejected list if exists
        rejectedList = rejectedList.filter(card => !(card.companyName === companyName && card.designation === designation));

        if (currentFilter === "rejected") {
            createRejectedJobCard();
        }
        updateJobCounters();
    } else if (event.target.classList.contains("reject-btn")) {
        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;
        const salary = card.querySelector(".salary").textContent;
        const status = card.querySelector(".status").textContent;
        const details = card.querySelector(".details").textContent;

        card.querySelector(".status").textContent = "REJECTED";

        // after updating filtered card
        const originalCard = Array.from(allCardsContainer.children).find(c =>
            c.querySelector(".company-name").textContent === companyName &&
            c.querySelector(".designation").textContent === designation
        );
        if (originalCard) {
            originalCard.querySelector(".status").textContent = "REJECTED";
        }

        const cardInfo = {
            companyName,
            designation,
            salary,
            status: "REJECTED",
            details
        };
        const rejectedExists = rejectedList.find(card => card.companyName === companyName && card.designation === designation);
        if (!rejectedExists) {
            rejectedList.push(cardInfo);
        }

        //remove from interview list if exists
        interviewList = interviewList.filter(card => !(card.companyName === companyName && card.designation === designation));
        if (currentFilter === "interview") {
            createInterviewJobCard();;
        }
        updateJobCounters();
    } else if (event.target.classList.contains("delete-btn")) {

        const card = event.target.closest(".job-card");
        const companyName = card.querySelector(".company-name").textContent;
        const designation = card.querySelector(".designation").textContent;

        // Remove from main DOM (if exists there)
        for (const mainCard of allCardsContainer.children) {
            const mainName = mainCard.querySelector(".company-name").textContent;
            const mainDesignation = mainCard.querySelector(".designation").textContent;

            if (mainName === companyName && mainDesignation === designation) {
                mainCard.remove();
                break;
            }
        }

        // Remove from interviewList
        interviewList = interviewList.filter(c =>
            !(c.companyName === companyName && c.designation === designation)
        );

        // Remove from rejectedList
        rejectedList = rejectedList.filter(c =>
            !(c.companyName === companyName && c.designation === designation)
        );

        // Refresh filtered section if needed
        if (currentFilter === "interview") {
            createInterviewJobCard();
        }

        if (currentFilter === "rejected") {
            createRejectedJobCard();
        }

        updateJobCounters();
    }
}
);

