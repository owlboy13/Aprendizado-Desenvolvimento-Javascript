import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convite.html',
  styleUrl: './convite.css'
})
export class ConviteComponent {
  // ✅ DECLARAR A PROPRIEDADE AQUI
  buttonPositions = [
    { top: '20%', left: '30%' },
    { top: '60%', left: '70%' },
    { top: '80%', left: '20%' },
    { top: '40%', left: '80%' },
    { top: '10%', left: '50%' }
  ];

  currentNoPosition = { top: '50%', left: '60%' }; // ✅ PROPRIEDADE ADICIONADA
  showSuccess = false;

  constructor(private router: Router) {}

  onNoHover() {
    const randomPosition = this.buttonPositions[
      Math.floor(Math.random() * this.buttonPositions.length)
    ];
    this.currentNoPosition = randomPosition;
  }

  onYesClick() {
    this.showSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/obrigado']);
    }, 2000);
  }

  onNoClick() {
    this.onNoHover();
  }
}