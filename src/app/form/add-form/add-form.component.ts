import { Component,OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
import { findIndex } from 'lodash-es';
import { ApiService } from "src/app/backend/api.service";
import {NgForm} from '@angular/forms'
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{

  ngOnInit(): void {
    this.dropdownList = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Mercedes' },
      { id: 3, name: 'BMW' },
      { id: 4, name: 'Audi' },
    ];
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
    this.formData=[]
    this.uploaded_files = [];
      this.getAllEmpolyee()

  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
  dropdownList:any = [];
  dropdownSettings:IDropdownSettings={};
  base_url = environment.url;
  all_projects_list:any = []
  err=false;
  showAdd !: boolean
  showUpdate !: boolean
  nameHasError : boolean = false
  isImageChanged = false;
  newImageUploaded: boolean = false;
  files:any =[]
  urls:any=[]
  uploaded_files:any=[]
  already_uploadedurls:any=[]
  formData : any = []
  type = "add";
  remaining_url:any = []

  constructor(private api:ApiService){}
  // selectedCars = [];
  //   cars = [
  //       { id: 1, name: 'Volvo' },
  //       { id: 2, name: 'Mercedes' },
  //       { id: 3, name: 'BMW' },
  //       { id: 4, name: 'Audi' },
  //   ];
  clickAddEmployee(){
    this.formData.gender='male'
    this.showAdd = true
    this.showUpdate = false
  }


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.files.push({ file: event.target.files[i], type: "optional" })
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push({ url: event.target.result });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      this.err=false;
    }
  }
  clearOptionalFile(i:any) {
    this.files[i].isdelete = 1
    this.urls[i].isdelete = 1
    let a= this.urls.filter((fl:any) => { return !fl.isdelete })
    if(a.length > 0){
      this.err=true;
    }
  }

  clearAlreadyUploadedFile(image:any) {
    let findI = findIndex(this.already_uploadedurls, (v:any) => { return v.baseimage == image })
    if (findI != -1) {
      this.already_uploadedurls[findI].isdelete = 1;
    }
    this.remaining_url = this.already_uploadedurls.filter((fl:any) => { return !fl.isdelete }).map((a:any) => { return a.baseimage })

  }
  postEmployeeDetails(){
    // this.remaining_url = this.already_uploadedurls.filter((fl:any) => { return !fl.isdelete }).map((a:any) =>{return a.baseimage} )

    const data = new FormData()
    this.uploaded_files = [];

    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "roomimage" })
      }
    }
    let params = {
      id: this.formData._id,
      firstname: this.formData.firstname,
      lastname: this.formData.lastname,
      email: this.formData.email,
      address: this.formData.address,
      phone: this.formData.phone,
      gender: this.formData.gender,
      car: this.formData.car,
      remaining_url: this.remaining_url,
      uploaded_files: this.uploaded_files,
    }
    data.append('body',JSON.stringify(params))
    this.api.postEmployee(data)
    .subscribe((res:any)=>{
      alert("Employee Added")
      let ref = document.getElementById('cancel')
      ref?.click()

      this.getAllEmpolyee()

    },
    err=>{
      alert("Something Wrong")
    })
  }
  updateEmployeeDetails(){
    // this.remaining_url = this.already_uploadedurls.filter((fl:any) => { return !fl.isdelete }).map((a:any) =>{return a.baseimage} )

    const data = new FormData()
    this.uploaded_files = [];

    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "roomimage" })
      }
    }
    let params = {
      firstname: this.formData.firstname,
      lastname: this.formData.lastname,
      email: this.formData.email,
      address: this.formData.address,
      phone: this.formData.phone,
      gender: this.formData.gender,
      car: this.formData.car,
      remaining_url: this.remaining_url,
      uploaded_files: this.uploaded_files,
    }
    data.append('body', JSON.stringify(params));

    this.api.updateEmployee(data,this.formData.id)
    .subscribe((res:any)=>{
      // this.userData.data
      let ref = document.getElementById('cancel')
      ref?.click()
      this.getAllEmpolyee()
    })
  }
  getAllEmpolyee(){

    this.api.getEmployee()
    .subscribe(res=>{
      if (res.status == 200) {
        this.formData = res.data
      }


    })
  }
  deleteEmployee(row: any){
    this.api.deleteEmployee(row._id)
    .subscribe(res=>{
      alert("Deleted")
      this.getAllEmpolyee()
    })
  }
  onEdit(row: any){
    this.showAdd = false
    this.showUpdate = true
    this.formData.id = row._id,
    this.formData.firstname=row.firstname,
    this.formData.lastname=row.lastname,
    this.formData.email=row.email,
    this.formData.address=row.address,
    this.formData.phone=row.phone,
    this.formData.gender=row.gender,
    this.formData.car=row.car,
    this.formData.room_images=row.room_images
    console.log(row.room_images[0].image);

  }
}
