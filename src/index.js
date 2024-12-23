class CircularProgressBar {
    constructor(container, radius, strokeWidth, initialProgress = 0) {
        this.container = document.querySelector(container);
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.progress = initialProgress;
        this.circumference = 2 * Math.PI * this.radius;

        this.svg = null;
        this.circle = null;
        this.createProgressBar();
        this.updateProgress(this.progress);
    }

    createProgressBar() {
        // Create SVG element
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", this.radius * 2 + this.strokeWidth * 2);
        this.svg.setAttribute("height", this.radius * 2 + this.strokeWidth * 2);

        // Create circle element
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.circle.setAttribute("cx", this.radius + this.strokeWidth);
        this.circle.setAttribute("cy", this.radius + this.strokeWidth);
        this.circle.setAttribute("r", this.radius);
        this.circle.setAttribute("stroke", "#4caf50");
        this.circle.setAttribute("stroke-width", this.strokeWidth);
        this.circle.setAttribute("fill", "none");
        this.circle.setAttribute("stroke-dasharray", this.circumference);
        this.circle.setAttribute("stroke-dashoffset", this.circumference);
        this.circle.style.transition = "stroke-dashoffset 0.5s ease";

        // Append circle to SVG and SVG to container
        this.svg.appendChild(this.circle);
        this.container.appendChild(this.svg);
    }

    updateProgress(value) {
        if (value < 0 || value > 100) {
            console.error("Progress value must be between 0 and 100.");
            return;
        }
        this.progress = value;
        const offset = this.circumference - (value / 100) * this.circumference;
        this.circle.setAttribute("stroke-dashoffset", offset);
    }
}

// Usage example
const progressBar = new CircularProgressBar("#progress-container", 50, 10);

// Expose API to update progress dynamically
window.updateProgressBar = (progress) => {
    progressBar.updateProgress(progress);
};
