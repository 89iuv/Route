package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.config.PersistenceConfig;
import com.lazydash.route.persistence.model.Driver;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by VUveges on 10/27/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PersistenceConfig.class)
public class DriverRepositoryTest {

    @Autowired
    private DriverRepository driverRepository;

    @Test
    public void testCRUD(){
        Driver driver = new Driver();
        driver.setName("testNme");
        driver.setCar("testCar");

        Driver savedDriver = driverRepository.save(driver);
        Driver foundDriver = driverRepository.findOne(savedDriver.getId());

        Assert.assertEquals(driver.getName(), foundDriver.getName());
        Assert.assertEquals(driver.getCar(), foundDriver.getCar());

        foundDriver.setName("testNameModified");
        foundDriver.setCar("testCarModified");
        Driver modifiedDriver = driverRepository.save(foundDriver);

        Assert.assertEquals(foundDriver.getName(), modifiedDriver.getName());
        Assert.assertEquals(foundDriver.getCar(), modifiedDriver.getCar());

        driverRepository.delete(modifiedDriver);
        Driver deleteDriver = driverRepository.findOne(modifiedDriver.getId());

        Assert.assertEquals(null, deleteDriver);
    }

}