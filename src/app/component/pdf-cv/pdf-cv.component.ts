import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Cv, Education , Experience , Skill} from '../../model/cv'

const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };


@Component({
  selector: 'app-pdf-cv',
  templateUrl: './pdf-cv.component.html',
  styleUrls: ['./pdf-cv.component.css']
})
export class PdfCvComponent implements OnInit {

  /* generatePdf(){
  pdfMake.createPdf(documentDefinition).open();
 }

 downloadPdf(){
  pdfMake.createPdf(documentDefinition).download();
 }

 printPdf(){
  pdfMake.createPdf(documentDefinition).print();
 }
 */
 cv = new Cv();

 degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

 constructor() {


    /*if (!this.cv.experiences || this.cv.experiences.length === 0) {
      this.cv.experiences = [];
      this.cv.experiences.push(new Experience());
    }

    if (!this.cv.educations || this.cv.educations.length === 0) {
      this.cv.educations = [];
      this.cv.educations.push(new Education());
    }

    if (!this.cv.skills || this.cv.skills.length === 0) {
      this.cv.skills = [];
      this.cv.skills.push(new Skill());
    }
    */
}

  ngOnInit(){
    this.cv = JSON.parse(sessionStorage.getItem('cv')) || new Cv();
}
  addExperience() {
    this.cv.experiences.push(new Experience());
  }

  addEducation() {
    this.cv.educations.push(new Education());
  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  resetForm() {
    this.cv = new Cv();
  }

  getDocumentDefinition() {
    
   sessionStorage.setItem('cv', JSON.stringify(this.cv));    
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.cv.name,
              style: 'name'
            },
            {
              text: this.cv.address
            },
            {
              text: 'Email : ' + this.cv.email,
            },
            {
              text: 'Contant No : ' + this.cv.contactNo,
            },
            {
              text: 'GitHub: ' + this.cv.socialProfile,
              link: this.cv.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
        text: 'Skills',
        style: 'header'
        },
        {
        columns: [
        	{
            ul : [
              ...this.cv.skills.filter((value,index)=> index % 3 === 0).map(s => s.value)
            ]
          },
          {
          	ul : [
          	...this.cv.skills.filter((value,index) => index % 3 === 1).map(s => s.value)
          	]
          },
          {
          	ul : [
          	...this.cv.skills.filter((value,index) => index % 3 === 2).map(s => s.value)
          	]
          }
        ]
        },
        {
        text: 'Experience',
        style: 'header'
      },
      this.getExperienceObject(this.cv.experiences),
      {
        text: 'Education',
        style: 'header'
      },
      this.getEducationObject(this.cv.educations),
      {
        text: 'Other Details',
        style: 'header'
      },
      {
        text: this.cv.otherDetails
      },
      {
        text: 'Signature',
        style: 'sign'
      },
      {
        columns : [
            { qr: this.cv.name + ', Contact No : ' + this.cv.contactNo, fit : 100 },
            {
            text: `(${this.cv.name})`,
            alignment: 'right',
            }
        ]
      }
        ],

        styles: {
          sign: {
	          margin: [0, 50, 0, 10],
	          alignment: 'right',
	          italics: true
        },

          header: {
	          fontSize: 18,
	          bold: true,
	          margin: [0, 20, 0, 10],
	          decoration: 'underline'
        },
          name: {
            fontSize: 16,
            bold: true
          }
        },

        info: {
      title: this.cv.name + '_CV',
      author: this.cv.name,
      subject: 'CV',
      keywords: 'CV, ONLINE CV',
    }
    };
  }

  getExperienceObject(experiences: Experience[]) {
  const exs = [];
  experiences.forEach(experience => {
    exs.push(
      [{
        columns: [
          [{
            text: experience.jobTitle,
            style: 'jobTitle'
          },
          {
            text: experience.employer,
          },
          {
            text: experience.jobDescription,
          }],
          {
            text: 'Experience : ' + experience.experience + ' Months',
            alignment: 'right'
          }
        ]
      }]
    );
  });
  return {
    table: {
      widths: ['*'],
      body: [
        ...exs
      ]
    }
  };
}

getEducationObject(educations: Education[]) {
  return {
    table: {
      widths: ['*', '*', '*', '*'],
      body: [
        [{
          text: 'Degree',
          style: 'tableHeader'
        },
        {
          text: 'College',
          style: 'tableHeader'
        },
        {
          text: 'Passing Year',
          style: 'tableHeader'
        },
        {
          text: 'Result',
          style: 'tableHeader'
        },
        ],
        ...educations.map(ed => {
          return [ed.degree, ed.college, ed.passingYear, ed.percentage];
        })
      ]
    }
  };
}

  getProfilePicObject() {
    if (this.cv.profilePic) {
      return {
        image: this.cv.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }
  
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
      this.cv.profilePic = reader.result as string;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

  addSkill() {
    this.cv.skills.push(new Skill());
  }

}

