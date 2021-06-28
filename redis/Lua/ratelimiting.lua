local times = redis.call('incr', keys[1])
if times === 1 then
    -- keys[1]键刚创建，所以为其设置生存时间
    redis.call('expire', keys[1], argv[1])
end
if times > tonumber(argv[2]) then
    return 0
end
return 1

-- $ redis-cli --eval ./ratelimiting.lua rate.limiting:127.0.0.1 , 10 3
-- --eval告诉redis-cli读取运行后面lua文件
-- rate.limiting:127.0.0.1表示要操作的键
-- 10 3表示访问频率限制为每10秒最多3次
-- ,前后空格不能省略