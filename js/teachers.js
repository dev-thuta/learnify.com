const teachers = [
        {
            name: "Tr. Kafka",
            img: "images/profile-pics/Character_Kafka_Splash_Art.webp",
            alt: "Teacher Kafka",
            subjects: ["Mathematics", "History"],
            grades: ["High School", "College"],
            location: "Springfield",
            profile: "teacher-profiles/teacher-kafka.html",
            description: "Experienced educator passionate about instilling a love for learning."
        },
        {
            name: "Sir. SAM",
            img: "images/profile-pics/firefly_card.webp",
            alt: "Teacher Firefly (SAM)",
            subjects: ["Science", "English"],
            grades: ["Middle School"],
            location: "Oakville",
            profile: "teacher-profiles/teacher-sam.html",
            description: "Dedicated to making complex topics accessible and engaging for students."
        },
        {
            name: "Ms. Castorice",
            img: "images/profile-pics/castorice_card.webp",
            alt: "Teacher Cas",
            subjects: ["Music"],
            grades: ["Primary", "Middle School"],
            location: "Riverdale",
            profile: "teacher-profiles/teacher-castorice.html",
            description: "Bringing creativity and joy to music education for young learners."
        }
    ];

    function createTeacherCard(teacher, index) {
        const subjectData = teacher.subjects.map(s => s.toLowerCase().split(' ')[0]).join(' ');
        const gradeData = teacher.grades.map(g => {
            if (g.includes('Primary')) return 'primary';
            if (g.includes('Middle')) return 'middle';
            if (g.includes('High')) return 'high';
            if (g.includes('College')) return 'college';
            return '';
        }).join(' ');
        return `
            <div class="col-md-6 col-lg-4 teacher-item"
                data-subject="${subjectData}"
                data-grade="${gradeData}"
                data-location="${teacher.location}"
                data-aos="fade-up"
                ${index ? `data-aos-delay="${index * 100}"` : ''}>
                <div class="card teacher-card h-100 shadow-sm">
                    <img src="${teacher.img}" class="card-img-top" alt="${teacher.alt}" style="max-height: 200px; object-fit: scale-down;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${teacher.name}</h5>
                        <p class="card-text text-muted small">Subjects: ${teacher.subjects.join(', ')}</p>
                        <p class="card-text text-muted small">Grades: ${teacher.grades.join(', ')}</p>
                        <p class="card-text text-muted small">Location: ${teacher.location}</p>
                        <p class="card-text flex-grow-1">${teacher.description}</p>
                        <a href="${teacher.profile}" class="btn btn-primary mt-auto align-self-start">View Profile</a>
                    </div>
                </div>
            </div>
        `;
    }

    document.addEventListener("DOMContentLoaded", function() {
        const teachersList = document.getElementById("teachersList");
        if (teachersList) {
            teachersList.innerHTML = teachers.map(createTeacherCard).join('');
        }
    });