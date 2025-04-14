# Firebase Project Handover Guide

## 1. Transfer Ownership while Maintaining Access

### Steps for Project Transfer:

1. **Add the client as an Owner**:
   - Go to Firebase console: https://console.firebase.google.com/
   - Select your Yodeck Air Quality project
   - Go to Project Settings → Users and permissions
   - Click "Add member" and enter your client's business email
   - Assign them the "Owner" role
   - They'll receive an invitation email to join the project

2. **Create a Service Account for Yourself**:
   - While still in Project Settings → Service accounts
   - Click "Generate new private key" to download credentials JSON
   - Store this securely - it grants programmatic access to the project
   - Document this access method for future maintenance needs

3. **Keep your personal access**:
   - Keep yourself as a "Editor" or "Owner" role for maintenance
   - This ensures you can make future changes as needed

## 2. Preventing Billing Issues

### Stay on Free Tier (Spark Plan):

1. **Set Up a Budget Alert**:
   - In Firebase console, go to Project Settings → Usage and billing → Details & settings
   - Click "Set budget alert"
   - Create a budget for $0.01 (smallest allowed)
   - Enable email alerts for 50%, 90%, and 100% thresholds
   - This will notify both you and the client before any charges

2. **Avoid Exceeding Free Limits**:
   - Document the free tier limits for the client:
     - Realtime Database: 1GB storage, 10GB/month downloads
     - Authentication: 50K monthly active users
     - Hosting: 10GB storage, 360MB/day downloads
     - Cloud Functions: 2M invocations/month
   - The application's current usage is well below these limits

3. **Understand What Triggers Billing**:
   - Automatic upgrades to the Blaze Plan happen if:
     - You manually switch plans
     - You enable services that require the Blaze Plan (like Firebase ML)
   - The application currently uses only free-tier compatible services

## 3. Long-term Maintenance Recommendations

1. **Regular Monitoring**:
   - Check Firebase console periodically to monitor usage
   - Set calendar reminders quarterly to review project status

2. **Data Backup Procedure**:
   - Export database: Firebase console → Realtime Database → ⋮ menu → Export JSON
   - Save the JSON file to a secure location
   - Recommend quarterly backups

3. **Documentation Updates**:
   - Keep this document updated with any configuration changes
   - Maintain a changelog of significant updates to the application

## 4. Client Reference Information

- Firebase Console: https://console.firebase.google.com/
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Free Tier Info: https://firebase.google.com/pricing
- Support Contact: [Your contact information]
