import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: any;
  isEditMode = false;
  productId!: number;
  uploadedImageUrl: string | null = null;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0],
      category: [''],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = +idParam;
      this.productService.getById(this.productId).subscribe(product => {
        this.productForm.patchValue(product);
        this.uploadedImageUrl = product.imageUrl;
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.productService.uploadImage(formData).subscribe({
        next: (res: any) => {
          this.uploadedImageUrl = res.imageUrl;
          this.productForm.patchValue({ imageUrl: res.imageUrl });
        },
        error: () => alert('Resim yüklenemedi')
      });
    }
  }

  onSubmit() {
    const productData = this.productForm.value;

    if (this.isEditMode) {
      this.productService.update(this.productId, productData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(productData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}

