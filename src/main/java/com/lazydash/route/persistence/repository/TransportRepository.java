package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.model.Transport;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by VUveges on 11/1/2016.
 */
public interface TransportRepository extends PagingAndSortingRepository<Transport, Long> {
}
