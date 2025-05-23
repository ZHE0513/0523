let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const newPoints = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];
const leftEye1 = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
const leftEye2 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
const rightEye = [359, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 0, 0); // Red color
  strokeWeight(1.5); // Line thickness
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw lines connecting points in the new array
    for (let i = 0; i < newPoints.length - 1; i++) {
      const [x1, y1] = keypoints[newPoints[i]];
      const [x2, y2] = keypoints[newPoints[i + 1]];
      line(x1, y1, x2, y2);
    }

    // Draw lines connecting points in the leftEye1 array
    for (let i = 0; i < leftEye1.length - 1; i++) {
      const [x1, y1] = keypoints[leftEye1[i]];
      const [x2, y2] = keypoints[leftEye1[i + 1]];
      line(x1, y1, x2, y2);
    }

    // Draw lines connecting points in the leftEye2 array
    for (let i = 0; i < leftEye2.length - 1; i++) {
      const [x1, y1] = keypoints[leftEye2[i]];
      const [x2, y2] = keypoints[leftEye2[i + 1]];
      line(x1, y1, x2, y2);
    }

    // Draw lines connecting points in the rightEye array
    for (let i = 0; i < rightEye.length - 1; i++) {
      const [x1, y1] = keypoints[rightEye[i]];
      const [x2, y2] = keypoints[rightEye[i + 1]];
      line(x1, y1, x2, y2);
    }
  }
}
