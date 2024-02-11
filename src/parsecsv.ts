interface Teacher {
  name: string;
  course: string;
  quality: number;
  difficulty: number;
  review: string;
}

export function parseCSV(csvData: string, courseName: string): Teacher[] {
  const teachers: Teacher[] = [];
  
  const rows = csvData.split('\n');
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();
    if (row) {
      const [name, course, quality, difficulty, ...reviewParts] = row.split('\t');
      const review = reviewParts.join('\t'); // Reconstruct the review with all parts after splitting by tab
      if (course.trim() === courseName) {
        teachers.push({
          name: name.trim(),
          course: course.trim(),
          quality: parseFloat(quality.trim()),
          difficulty: parseFloat(difficulty.trim()),
          review: review.trim()
        });
      }
    }
  }
  
  return teachers;
}

// Example usage:
const csvData = `Name\tClass\tQUALITY\tDIFFICULTY\tReview
John Doe\tMathematics\t4.5\t3.2\tGood teacher
Jane Smith\tPhysics\t4.8\t3.5\tExcellent instructor`;
const courseName = 'CSCI';
const teachersForCourse = parseCSV(csvData, courseName);
console.log(teachersForCourse);
