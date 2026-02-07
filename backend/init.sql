CREATE TABLE provider_costs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    validity VARCHAR(100),
    provider_cost DECIMAL(10,2),
    provider_name VARCHAR(100),
    provider_contact VARCHAR(255),
    provider_type ENUM('WhatsApp', 'Website'),
    availability VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_product (product_name, validity)
);

DELIMITER $$

CREATE TRIGGER update_lowest_price
BEFORE INSERT ON provider_costs
FOR EACH ROW
BEGIN
    DECLARE min_price DECIMAL(10,2);
    DECLARE best_provider VARCHAR(100);
    DECLARE best_contact VARCHAR(255);
    
    -- Find minimum price from all sources
    SELECT MIN(price), provider_name, provider_contact
    INTO min_price, best_provider, best_contact
    FROM (
        SELECT price, 'List 1' as provider_name, '+91 721 782 9284' as provider_contact 
        FROM list1_prices WHERE product = NEW.product_name AND validity = NEW.validity
        UNION ALL
        SELECT price, 'List 2' as provider_name, '+91 84079 83973' as provider_contact 
        FROM list2_prices WHERE product = NEW.product_name AND validity = NEW.validity
        UNION ALL
        SELECT price, provider_name, website_url as provider_contact 
        FROM website_prices WHERE product = NEW.product_name AND validity = NEW.validity
    ) AS all_sources
    ORDER BY price ASC
    LIMIT 1;
    
    -- Set the values
    SET NEW.provider_cost = min_price;
    SET NEW.provider_name = best_provider;
    SET NEW.provider_contact = best_contact;
END$$

DELIMITER ;
