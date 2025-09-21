// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-blue-600');
                    link.classList.add('text-gray-500');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-500');
                        link.classList.add('text-blue-600');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Basic validation
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            e.preventDefault(); // Prevents form from submitting
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            e.preventDefault(); // Prevents form from submitting
            return;
        }
        
        // Formspree will handle the submission from here.
        // No need for a preventDefault() or alert() after this point.
    });
}

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hover-scale');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.bg-blue-600, .bg-green-600, .bg-purple-600');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        const animateSkillBar = () => {
            let currentWidth = 0;
            const targetWidth = parseInt(width);
            const increment = targetWidth / 50;
            
            const animate = () => {
                if (currentWidth < targetWidth) {
                    currentWidth += increment;
                    bar.style.width = currentWidth + '%';
                    requestAnimationFrame(animate);
                } else {
                    bar.style.width = width;
                }
            };
            animate();
        };
        
        // Trigger animation when skills section is visible
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBar();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillsObserver.observe(skillsSection);
        }
    });
});
