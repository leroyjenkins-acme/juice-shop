/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import * as jwtDecode from 'jwt-decode'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-last-login-ip',
  templateUrl: './last-login-ip.component.html',
  styleUrls: ['./last-login-ip.component.scss'],
  imports: [MatCardModule, TranslateModule]
})

export class LastLoginIpComponent {
  lastLoginIp: any = '?'
  constructor (private readonly sanitizer: DomSanitizer) {}

  ngOnInit (): void {
    try {
      this.parseAuthToken()
    } catch (err) {
      console.error('An error occurred while parsing the auth token.') // Avoid exposing sensitive information
    }
  }

  parseAuthToken () {
    let payload = {} as any
    const token = localStorage.getItem('token')
    if (token) {
      payload = jwtDecode(token)
      if (payload.data.lastLoginIp) {
        this.lastLoginIp = this.sanitizer.sanitize(1, `<small>${payload.data.lastLoginIp}</small>`) // Sanitize the HTML content
      }
    }
  }
}