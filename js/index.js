const elem = document.querySelector("#root");
document.body.style.height = "100vh";
elem.style.height = "100%";
elem.style.width = "100%";
elem.style.display = "flex";
elem.style.position = "relative";
elem.style.perspective = "1024px";
let yaw = 0;
let x = 0;
elem.style.perspectiveOrigin = `${yaw}px 500px`;
elem.style.transformStyle = "preserve-3d";

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	switch (e.code) {
		case "ArrowUp":
			x += 25;
			break;
		case "ArrowDown":
			x -= 25;
			break;
		case "ArrowLeft":
			yaw += 25;
			break;
		case "ArrowRight":
			yaw -= 25;
			break;
	}

	console.log(yaw);
	elem.style.perspectiveOrigin = yaw + "px 500px ";
	console.log(elem.style.perspectiveOrigin);
	updateAll();
});

const updateAll = () => {
	entities.flat().forEach((entity) => entity.constructElement());
};

const tiles = [
	// ["X", "X", "X", "X", "X"],
	["X", "_", "_", "_", "X"],
	["X", "_", "_", "_", "X"],
	["X", "_", "_", "X", "X"],
	["X", "_", "_", "X", "X"],
	["X", "O", "_", "_", "X"],
	["X", "_", "_", "_", "X"],
	["X", "X", "X", "X", "X"],
];

class Entity {
	constructor(type, row, col) {
		this.type = type;
		switch (type) {
			case "X":
				this.type = "wall";
				break;
			default:
				this.type = "floor";
				break;
		}
		this.element = document.createElement("div");
		this.row = row;
		this.col = col;
		const isFloor = this.type === "floor";
		this.element.style.backgroundImage = isFloor ? "" : "url('wall.jpg')";
		this.constructElement();
		this.render();
	}

	constructElement() {
		const isFloor = this.type === "floor";
		// this.element.style.boxShadow = "0px 1px 2px rgba(0,0,0,.2)";
		this.element.style.position = "absolute";
		this.element.style.top = "0";
		this.element.style.left = "0";
		this.element.style.display = "flex";
		this.element.style.width = "300px";
		this.element.style.height = "300px";
		const translateY = -(this.row / 8) * 100 + "vh";
		const translateX = (this.col / 6) * 100 + "vw";
		const translateZ = -(this.row * 300) + "px";
		const rotateX = "0deg";
		const rotateY = yaw / 100 + "deg";
		const rotateZ = "0deg";
		const darkness = 100 - this.row * 10 + "%";
		this.element.style.transform = `translateZ(${translateZ}) translateY(${translateY}) translateX(${translateX}) rotateX(${rotateX}) rotateY(${rotateY}) rotateZ(${rotateZ})`;
		this.element.style.filter = `brightness(${darkness})`;
	}

	render() {
		elem.append(this.element);
	}
}

const entities = tiles.map((row, rowIndex) => {
	return row.map((tile, colIndex) => new Entity(tile, rowIndex, colIndex));
});

console.log(entities);
