import { Component, OnInit } from '@angular/core';
import { WebsitesService } from '../shared/websites.service';
import { NgForm } from '@angular/forms';
import { Websites } from '../shared/websites.model';
declare var M: any;

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css'],
  providers:[WebsitesService]
})
export class WebsitesComponent implements OnInit {

  constructor(public websitesService: WebsitesService) { }

  ngOnInit(){
    this.resetForm() ;
    this.refreshWebList() ;
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.websitesService.selectedWebsites = {
        _id: "",
        name: "",
        status:""
      }
  
  }

  onSubmit(form : NgForm)
  {
    if (form.value._id == "") {
      this.websitesService.postWeb(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshWebList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.websitesService.putWeb(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshWebList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshWebList() {
    this.websitesService.getWebList().subscribe((res) => {
      this.websitesService.websites = res as Websites[];
    });
  }

  onEdit(web: Websites) {
    this.websitesService.selectedWebsites = web;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.websitesService.deleteWeb(_id).subscribe((res) => {
        this.refreshWebList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}

