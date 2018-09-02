import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Http } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class MailService {
    private requestUrl: string = 'http://api.andrewpossardt.com';

    constructor(private http: Http) {
    }

    public sendEmail(fields: any) {
        let endpoint = `${this.requestUrl}/mail`;
        
        return this.http.post(endpoint, this.getEmailContent(fields)).toPromise();
    }

    private getEmailContent(fields: any) {
        return JSON.stringify({
            from: 'noreply@mail.andrewpossardt.com',
            to: 'andrewmpossardt@gmail.com',
            subject: 'New Message from andrewpossardt.com',
            html: `
                <html>
                    <div style="width: 100%; background-color: #72BCD4; color: #fff; padding: 10px; border-radius: 5px;">
                        <p><strong>Name:</strong> ${fields.firstName} ${fields.lastName}</p>
                        <p><strong>Email:</strong> ${fields.email}</p>
                        <p><strong>Message:</strong> ${fields.comment}</p>
                    </div>
                </html>
            `
        });
    }
}