// Leads Excel Export Utility
import * as XLSX from 'xlsx';

export const exportLeadsToExcel = (leads) => {
    // Prepare data for Excel
    const excelData = leads.map(lead => ({
        'Customer ID': lead.customer_id,
        'Name': lead.name || '',
        'Email': lead.email || '',
        'Phone': lead.phone || '',
        'Street Address': lead.street || '',
        'City': lead.city || '',
        'State': lead.state || '',
        'PIN Code': lead.pincode || '',
        'Country': lead.country || '',
        'Signup Source': lead.auth_provider === 'google' ? 'Google' : 'Email',
        'Profile Complete': lead.is_address_complete ? 'Yes' : 'No',
        'Registered On': new Date(lead.created_at).toLocaleString('en-IN'),
        'Last Updated': new Date(lead.updated_at).toLocaleString('en-IN')
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
        { wch: 12 },  // Customer ID
        { wch: 20 },  // Name
        { wch: 30 },  // Email
        { wch: 18 },  // Phone
        { wch: 35 },  // Street
        { wch: 15 },  // City
        { wch: 18 },  // State
        { wch: 10 },  // PIN
        { wch: 15 },  // Country
        { wch: 12 },  // Source
        { wch: 15 },  // Profile Complete
        { wch: 22 },  // Registered
        { wch: 22 },  // Updated
    ];
    worksheet['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Leads');

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `PremiumVerse_Leads_${date}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
};

export default exportLeadsToExcel;
