// Excel Export Utility for Products
import * as XLSX from 'xlsx';

/**
 * Export products to Excel file with formatting
 * @param {Array} products - Array of product objects
 */
export const exportProductsToExcel = (products) => {
    // Prepare data for Excel
    const data = products.map(product => ({
        'SKU': product.sku,
        'Product Name': product.product_name,
        'Category': product.category,
        'Validity': product.validity,
        'Provider Name': product.provider_name,
        'Provider Cost (₹)': product.provider_cost,
        'Selling Price (₹)': product.selling_price,
        'Original Price (₹)': product.original_price,
        'Profit (₹)': product.profit_amount,
        'Profit %': product.profit_percentage,
        'Stock Status': product.stock_status === 'in_stock' ? 'In Stock' :
            product.stock_status === 'out_of_stock' ? 'Out of Stock' : 'Limited',
        'Featured': product.is_featured ? 'Yes' : 'No',
        'Active': product.is_active ? 'Yes' : 'No',
        'Description': product.description || '',
        'Created At': new Date(product.created_at).toLocaleDateString('en-IN'),
        'Updated At': new Date(product.updated_at).toLocaleDateString('en-IN')
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    const colWidths = [
        { wch: 18 },  // SKU
        { wch: 30 },  // Product Name
        { wch: 15 },  // Category
        { wch: 12 },  // Validity
        { wch: 15 },  // Provider Name
        { wch: 15 },  // Provider Cost
        { wch: 15 },  // Selling Price
        { wch: 15 },  // Original Price
        { wch: 12 },  // Profit
        { wch: 10 },  // Profit %
        { wch: 12 },  // Stock Status
        { wch: 10 },  // Featured
        { wch: 8 },  // Active
        { wch: 40 },  // Description
        { wch: 12 },  // Created At
        { wch: 12 }   // Updated At
    ];
    worksheet['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Generate filename with date
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const filename = `products_export_${dateStr}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
};

/**
 * Parse Excel file to product array
 * @param {File} file - Excel file
 * @returns {Promise<Array>} - Array of product objects
 */
export const importProductsFromExcel = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Get first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Map to product format
                const products = jsonData.map(row => ({
                    product_name: row['Product Name'] || row['product_name'] || '',
                    category: row['Category'] || row['category'] || 'other',
                    validity: row['Validity'] || row['validity'] || '1 Month',
                    provider_name: row['Provider Name'] || row['provider_name'] || '',
                    provider_cost: parseFloat(row['Provider Cost (₹)'] || row['provider_cost']) || 0,
                    selling_price: parseFloat(row['Selling Price (₹)'] || row['selling_price']) || 0,
                    stock_status: (row['Stock Status'] || row['stock_status'] || 'in_stock')
                        .toLowerCase()
                        .replace(' ', '_'),
                    description: row['Description'] || row['description'] || ''
                }));

                // Validate
                const validProducts = [];
                const errors = [];

                products.forEach((product, index) => {
                    const rowNum = index + 2; // +2 for header row and 0-indexing
                    const rowErrors = [];

                    if (!product.product_name) {
                        rowErrors.push('Product name is required');
                    }
                    if (!product.provider_name) {
                        rowErrors.push('Provider name is required');
                    }
                    if (product.provider_cost <= 0) {
                        rowErrors.push('Provider cost must be positive');
                    }
                    if (product.selling_price <= 0) {
                        rowErrors.push('Selling price must be positive');
                    }

                    if (rowErrors.length > 0) {
                        errors.push({ row: rowNum, errors: rowErrors });
                    } else {
                        validProducts.push(product);
                    }
                });

                resolve({ products: validProducts, errors });
            } catch (error) {
                reject(new Error('Failed to parse Excel file: ' + error.message));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsArrayBuffer(file);
    });
};

/**
 * Generate sample Excel template for import
 */
export const downloadProductTemplate = () => {
    const sampleData = [
        {
            'Product Name': 'Netflix Premium',
            'Category': 'ott',
            'Validity': '1 Month',
            'Provider Name': 'Provider 1',
            'Provider Cost (₹)': 150,
            'Selling Price (₹)': 299,
            'Stock Status': 'In Stock'
        },
        {
            'Product Name': 'ChatGPT Plus',
            'Category': 'ai_tools',
            'Validity': '1 Month',
            'Provider Name': 'Provider 2',
            'Provider Cost (₹)': 180,
            'Selling Price (₹)': 299,
            'Stock Status': 'In Stock'
        }
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(sampleData);

    worksheet['!cols'] = [
        { wch: 25 },
        { wch: 15 },
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 }
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'product_import_template.xlsx');
};
