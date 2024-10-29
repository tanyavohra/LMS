// Example JavaScript code to dynamically update content (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const lmsName = "SAHAAY";
    document.title = `About Us - ${lmsName}`;
    document.querySelectorAll('section p, section li strong').forEach(element => {
        element.innerHTML = element.innerHTML.replace("[Your LMS Name]", lmsName);
    });
});
